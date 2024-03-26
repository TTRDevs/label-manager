import { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import VideoOutput from "./VideoOutput";
import InputFileUpload from "./InputFileUpload";
import CustomizedButton from "./CustomizedButton";
import Loader from "../../Core/Utilities/Loader";
import 'react-dom/client'
import './VideoMaker.css';
// import { StepIconProps } from '@mui/material/StepIcon';
// import StepIcon from '@mui/material/StepIcon';

const VideoMakerLogic: React.FC = () => {

    useEffect(() => {
        load()
    }, [])

    // ffmpeg
    const [loaded, setLoaded] = useState<boolean>(false);
    const ffmpegRef = useRef<FFmpeg>(new FFmpeg());
    const messageRef = useRef<HTMLParagraphElement>(null);

    // state - files
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    //state - loading
    const [videoLoading, setVideoLoading] = useState<boolean | null>(null);
    const [audioLoaded, setAudioLoaded] = useState<boolean | null>(null);
    const [imageLoaded, setImageLoaded] = useState<boolean | null>(null);
    const [videoNotStarted, setVideoNotStarted] = useState<boolean>(true);
    // const [audioProcessing, setAudioProcessing] = useState<boolean>(false);
    // const [imageProcessing, setImageProcessing] = useState<boolean>(false);
    // const [finalizingVideo, setFinalizingVideo] = useState<boolean>(false);
    // const [totalDuration, setTotalDuration] = useState<number>(0);

    const videoRef = useRef<HTMLVideoElement>(null);

    // handle functions - inputs
    const handleAudioFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAudioFile(e.target.files[0]);
            setAudioLoaded(true);
        }
    };

    const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFile(e.target.files[0]);
            setImageLoaded(true);
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
            alert('There was an unexpected error - there is no video data available')
        }
    };

    const handleCreateAnother = () => {
        setAudioFile(null);
        setImageFile(null);
        setAudioLoaded(null);
        setImageLoaded(null);
        setVideoNotStarted(true);
        setVideoLoading(null);

        if (videoRef.current && videoRef.current.src) {
            URL.revokeObjectURL(videoRef.current.src);
            videoRef.current.src = "";
        }

    };

    // const ColorlibStepIcon = (props: StepIconProps) => {
    //     const { active, completed, className } = props;

    //     const iconStyles = {
    //         color: active || completed ? '#FFA500' : 'grey', // Orange color for active and completed
    //     };

    //     return (
    //         <StepIcon
    //             {...props}
    //             className={className}
    //             sx={iconStyles} // Apply styles using sx prop
    //         />
    //     );
    // };

    const load = async () => {
        const ffmpeg = ffmpegRef.current;
        ffmpeg.on('log', ({ message }) => {
            if (messageRef.current) {
                messageRef.current.innerHTML = message;
            }
        });

        try {
            const coreURL = await toBlobURL('https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.min.js', "text/javascript"); // https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.js
            const wasmURL = await toBlobURL('https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm', "application/wasm");
            const workerURL = await toBlobURL('https://unpkg.com/@ffmpeg/core-mt@0.12.3/dist/esm/ffmpeg-core.worker.js', "text/javascript");

            await ffmpeg.load({ coreURL, wasmURL, workerURL });
            setLoaded(true);
        } catch (error) {
            const message = (error as Error).message || "An unknown error occurred";
            console.error("An error occurred while loading FFmpeg", message);
            if (messageRef.current) {
            messageRef.current.innerHTML = 'An error occurred while loading FFmpeg: ' + message;
            }
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

        setVideoNotStarted(false);
        setVideoLoading(true);

        const ffmpeg = ffmpegRef.current;
        if (audioFile) {
            // setAudioProcessing(true);
            await ffmpeg.writeFile("inputAd.wav", await fetchFile(audioFile));

        }

        await ffmpeg.exec(["-i", "inputAd.wav"])
        ffmpeg.on("log", ({ message }) => {
            console.log(message)
        });
        const audioDuration = await getDuration("inputAd.wav") || 0;

        console.log(audioDuration)

        await ffmpeg.exec([
            '-i', 'inputAd.wav',
            '-c:a', 'aac',
            '-b:a', '192k',
            'audioAac.aac'
        ]);
        // setCurrentProgress((1 / 3) * totalDuration); // One third progress after audio
        // setAudioProcessing(false);

        if (imageFile) {
            // setImageProcessing(true)
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
        // setCurrentProgress((2 / 3) * totalDuration); // Two thirds progress after image
        // setImageProcessing(false);
        // setFinalizingVideo(true);


        await ffmpeg.exec([
            '-i', 'imageVideo.mp4',
            '-i', 'audioAac.aac',
            '-c:v', 'copy',
            '-c:a', 'aac',
            '-shortest',
            'outputVideo.mp4'
        ]);

        const fileData = await ffmpeg.readFile('outputVideo.mp4');
        // await setFinalizingVideo(true)
        let data;
        if (typeof fileData === 'string') {
            data = Uint8Array.from(atob(fileData), c => c.charCodeAt(0));
        } else {
            data = new Uint8Array(fileData);
        }

        if (videoRef.current && data) {
            const videoBlob = URL.createObjectURL(
                new Blob([data], { type: 'video/mp4' })
            );
            videoRef.current.src = videoBlob
        } else {
            console.log("Could not create blob from mp4 data")
        }
        setVideoLoading(false);
    }
    return loaded && (
        <div className="VideoMkr">
            {videoLoading && <Loader />}
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
