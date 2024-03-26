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
import CircularLoader from "../../Core/Utilities/CircularLoader";
import './VideoMaker.css';


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
            {videoLoading && <CircularLoader />}
            {videoNotStarted ? (
                <div className="settings">
                    <div style={{ display: 'flex', gap: '80px', alignItems: 'center', justifyContent: 'center' }}>
                        <InputFileUpload
                            handleFunc={handleAudioFile}
                            media={'audio'}
                            style={{
                                backgroundColor: audioLoaded ? 'green' : 'orange',
                                color: 'white'
                            }}
                        />
                        <InputFileUpload
                            handleFunc={handleImageFile}
                            media={'image'}
                            style={{
                                backgroundColor: imageLoaded ? 'green' : 'orange',
                                color: 'white'
                            }}
                        />
                    </div>
                    {audioLoaded && imageLoaded && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                            <CustomizedButton clickFunc={createVideo} />
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <VideoOutput src={videoRef} clickFunc1={handleDownloadVideo} clickFunc2={handleCreateAnother} />
                </div>
            )
            }
        </div >
    )
}

export default VideoMakerLogic;
