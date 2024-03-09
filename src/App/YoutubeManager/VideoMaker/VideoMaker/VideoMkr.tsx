import { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import VideoOutput from "./VideoOutput";
import InputFileUpload from "./InputFileUpload";
import CustomizedButton from "./CustomizedButton";
import VideoMkrIntro from "./VideoMkrIntro";
import "./VideoMkr.css"
import Loader from "./Loader";
import Snackbar from "./Snackbar";
import 'react-dom/client'
import { useContext } from "react";
import { VideoContext } from "./VideoContext"
import { VideoContextType } from  "./VideoContext"

const VideoMaker: React.FC = () => {
    const [uuid, setUuid] = useState<string>('');
    const uidWhole = useContext(VideoContext) as VideoContextType;
    const uidString = uidWhole.uuid;
    useEffect(() => {
        setUuid(uidString)
    }, [uidString])

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

    // data reading functions
    const getMetadata = async (file: string) => {
        const ffmpeg = ffmpegRef.current;
        return new Promise<string>((resolve) => {
            let logData = "";
            const logListener = ({ message }: { message: string }) => {
                logData += message;
                if (message.indexOf("Aborted()") > -1) {
                    ffmpeg.off("log", logListener);
                    resolve(logData);
                }
            };
            ffmpeg.on("log", logListener);
            ffmpeg.exec(["-i", file]);
        });
    };

    const getDuration = async (file: string) => {
        const metadata = await getMetadata(file);
        const durationRegex = /Duration:\s*([0-9]{2}):([0-9]{2}):([0-9]{2}.[0-9]{0,2})/gm;
        const match = durationRegex.exec(metadata);
        if (!match) {
            return null;
        }
        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        const seconds = parseFloat(match[3]);
        return hours * 3600 + minutes * 60 + seconds;
    };

    // load ffmpeg
    const load = async () => {
        const ffmpeg = ffmpegRef.current;
        ffmpeg.on('log', ({ message }) => {
            if (messageRef.current) {
                messageRef.current.innerHTML = message;
            }
        });
        await ffmpeg.load({
            coreURL: await toBlobURL('https://unpkg.com/@ffmpeg/core-mt@0.12.4/dist/esm/ffmpeg-core.js', "text/javascript"),
            wasmURL: await toBlobURL('https://unpkg.com/@ffmpeg/core-mt@0.12.4/dist/esm/ffmpeg-core.wasm', "application/wasm"),
            workerURL: await toBlobURL('https://unpkg.com/@ffmpeg/core-mt@0.12.4/dist/esm/ffmpeg-core.worker.js', "text/javascript"),
        });
        setLoaded(true);
    };

    //exec ffmpeg 
    const createVideo = async () => {
        uuid &&
            setVideoNotStarted(false);
        setVideoLoading(true);
        const ffmpeg = ffmpegRef.current;
        if (audioFile) {
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
            videoRef.current.src = URL.createObjectURL(
                new Blob([data], { type: 'video/mp4' })
            );
        } else {
            console.log("Could not create blob from mp4 data")
        }
        setVideoLoading(false);
    }

    return loaded ? (
        <div className="VideoMkr">
            {videoLoading && <Loader />}
            {videoNotStarted ? (
                <div className="settings">
                    <VideoMkrIntro />
                    <h3>Choose .wav file</h3>
                    <InputFileUpload handleFunc={handleAudioFile} media={'audio'} />
                    {audioLoaded && <Snackbar media='audio' />}<br /><br />
                    <h3>Now, choose cover art file</h3>
                    <InputFileUpload handleFunc={handleImageFile} media={'image'} />
                    {imageLoaded && <Snackbar media='image' />}<br /><br /><br /><br />
                    <CustomizedButton clickFunc={createVideo} />
                    {/* <p ref={messageRef}></p> */}
                </div>
            ) : (
                <div>
                    <VideoOutput src={videoRef} />
                </div>
            )}
        </div>
    ) : (
        <div>
            <h1>Click to run ffmpeg</h1>
            <CustomizedButton clickFunc={load} />
        </div>
    );
}
export default VideoMaker;
