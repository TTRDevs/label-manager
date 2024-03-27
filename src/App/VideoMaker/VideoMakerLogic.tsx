import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from './../../Core/Redux/hooks';
import {
    setLoaded,
    setAudioFile,
    setImageFile,
    setVideoLoading,
    resetVideoCreationState,
    setVideoNotStarted
} from './../../Core/Redux/videoSlice';
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import VideoOutput from "./VideoOutput";
import InputFileUpload from "./InputFileUpload";
import CustomizedButton from "./CustomizedButton";
import LinearLoader from "../../Core/Utilities/LinearLoader";
import './VideoMaker.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const VideoMakerLogic: React.FC = () => {
    const dispatch = useAppDispatch();
    const {
        loaded,
        audioFile,
        imageFile,
        videoLoading,
        audioLoaded,
        imageLoaded,
        videoNotStarted,
    } = useAppSelector((state) => state.video);

    const ffmpegRef = useRef<FFmpeg>(new FFmpeg());
    const messageRef = useRef<HTMLParagraphElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const ffmpeg = ffmpegRef.current;
        ffmpeg.on('log', ({ message }) => {
            if (messageRef.current) {
                messageRef.current.innerHTML = message;
            }
        });

        try {
            const coreURL = await toBlobURL('https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.min.js', "text/javascript");
            const wasmURL = await toBlobURL('https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm', "application/wasm");
            const workerURL = await toBlobURL('https://unpkg.com/@ffmpeg/core-mt@0.12.3/dist/esm/ffmpeg-core.worker.js', "text/javascript");

            await ffmpeg.load({ coreURL, wasmURL, workerURL });
            dispatch(setLoaded(true));
        } catch (error) {
            const message = (error as Error).message || "An unknown error occurred";
            console.error("An error occurred while loading FFmpeg", message);
            if (messageRef.current) {
                messageRef.current.innerHTML = 'An error occurred while loading FFmpeg: ' + message;
            }
        }
    };

    const handleAudioFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            dispatch(setAudioFile(e.target.files[0]));
        }
    };

    const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            dispatch(setImageFile(e.target.files[0]));
        }
    };

    const handleDownloadVideo = () => {
        if (videoRef.current && videoRef.current.src) {
            const a = document.createElement("a");
            a.href = videoRef.current.src;
            a.download = "video.mp4";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert('There was an unexpected error - there is no video data available');
        }
    };

    const handleCreateAnother = () => {
        dispatch(resetVideoCreationState());

        if (videoRef.current && videoRef.current.src) {
            URL.revokeObjectURL(videoRef.current.src);
            videoRef.current.src = "";
        }
    };

    // data reading functions
    const getMetadata = async (file: string) => {
        const ffmpeg = ffmpegRef.current;
        return new Promise<string>((resolve, reject) => {
            let logData = "";
            const logListener = ({ message }: { message: string }) => {
                logData += message;
                if (message.indexOf("Aborted()") > -1) {
                    console.error("FFmpeg operation was aborted:", logData); // Detailed error log

                    ffmpeg.off("log", logListener);
                    resolve(logData);
                }
            };
            ffmpeg.on("log", logListener);
            try {
                ffmpeg.exec(["-i", file]);
            } catch (error) {
                console.error("Error executing FFmpeg command:", error); // Detailed error log
                ffmpeg.off("log", logListener);
                reject(error); // Rejecting the promise on error
            }
        });
    };

    const getDuration = async (file: string) => {
        try {
            const metadata = await getMetadata(file);
            const durationRegex = /Duration:\s*([0-9]{2}):([0-9]{2}):([0-9]{2}.[0-9]{0,2})/gm;
            const match = durationRegex.exec(metadata);
            if (!match) {
                return null;
            }
            const hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);
            const seconds = parseFloat(match[3]);
            const duration = hours * 3600 + minutes * 60 + seconds;
            // setTotalDuration(duration);
            return duration;
        } catch (error) {
            console.error("Error getting metadata for file:", file, error); // Detailed error log
            return null;
        }
    };

    //exec ffmpeg 
    const createVideo = async () => {
        dispatch(setVideoNotStarted(false));
        dispatch(setVideoLoading(true));

        const ffmpeg = ffmpegRef.current;

        if (audioFile) {
            await ffmpeg.writeFile("inputAd.wav", await fetchFile(audioFile));
        }

        await ffmpeg.exec(["-i", "inputAd.wav"]);
        ffmpeg.on("log", ({ message }) => {
            console.log(message);
        });
        const audioDuration = await getDuration("inputAd.wav") || 0;

        console.log(audioDuration);

        await ffmpeg.exec([
            '-i', 'inputAd.wav',
            '-c:a', 'aac',
            '-b:a', '192k',
            'audioAac.aac'
        ]);

        if (imageFile) {
            await ffmpeg.writeFile("inputImg.png", await fetchFile(imageFile));
        }

        await ffmpeg.exec([
            '-loop', '1',
            '-i', 'inputImg.png',
            '-c:v', 'libx264',
            '-t', audioDuration.toString(),
            '-pix_fmt', 'yuv420p',
            '-vf', 'scale=1920x1080',
            'imageVideo.mp4'
        ]);

        await ffmpeg.exec([
            '-i', 'imageVideo.mp4',
            '-i', 'audioAac.aac',
            '-c:v', 'copy',
            '-c:a', 'aac',
            '-shortest',
            'outputVideo.mp4'
        ]);

        const fileData = await ffmpeg.readFile('outputVideo.mp4');
        let data;
        if (typeof fileData === 'string') {
            data = Uint8Array.from(atob(fileData), c => c.charCodeAt(0));
        } else {
            data = new Uint8Array(fileData);
        }

        if (videoRef.current && data) {
            const videoBlob = URL.createObjectURL(new Blob([data], { type: 'video/mp4' }));
            videoRef.current.src = videoBlob;
        } else {
            console.log("Could not create blob from mp4 data");
        }

        dispatch(setVideoLoading(false));
    };

    return loaded && (
        <div className="VideoMkr">
            {videoNotStarted ? (
                <div className="settings">
                    {/* Accordion for Audio File Upload */}
                    <Accordion sx={{ backgroundColor: 'rgb(112 154 189)', marginBottom: "20px" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <p style={{ color: "white", marginLeft: "10px" }}>
                                {audioLoaded ? "Audio file uploaded successfully" : "Upload your audio file"}
                            </p>
                        </AccordionSummary>
                        <AccordionDetails style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <InputFileUpload
                                handleFunc={handleAudioFile}
                                media={'audio'}
                                style={{
                                    backgroundColor: audioLoaded ? 'green' : 'orange',
                                    color: 'white',
                                    borderRadius: "10px",
                                    marginBottom: "10px"
                                }}
                            />
                        </AccordionDetails>
                    </Accordion>

                    {/* Accordion for Image File Upload */}
                    <Accordion sx={{ backgroundColor: 'rgb(112 154 189)', marginBottom: "20px" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <p style={{ color: "white", marginLeft: "10px" }}>
                                {imageLoaded ? "Image file uploaded successfully" : "Upload your background image"}
                            </p>
                        </AccordionSummary>
                        <AccordionDetails style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <InputFileUpload
                                handleFunc={handleImageFile}
                                media={'image'}
                                style={{
                                    backgroundColor: imageLoaded ? 'green' : 'orange',
                                    color: 'white',
                                    borderRadius: "10px",
                                    marginBottom: "10px"
                                }}
                            />
                        </AccordionDetails>
                    </Accordion>
                    {/* Button to create video */}
                    {audioLoaded && imageLoaded && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                            <CustomizedButton clickFunc={createVideo} />
                        </div>
                    )}
                </div>
            ) : (
                <div style={{ position: "relative" }}>
                    <VideoOutput src={videoRef} clickFunc1={handleDownloadVideo} clickFunc2={handleCreateAnother}/>
                    <div>
                        {videoLoading && (
                            <div className="loader">
                                <LinearLoader />
                                <p style={{ color: "darkgrey", backgroundColor: "white", fontSize: "1.5em", padding: "10px", borderRadius: "100px" }}>Loading Video</p>
                                {/* <p className="loadingText">Loading Video...</p> Add this line with a class */}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoMakerLogic;