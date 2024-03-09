import React, { RefObject } from 'react';
import "./VideoOutput.css";

interface VideoOutputProps {
    src: RefObject<HTMLVideoElement>;
}

const VideoOutput: React.FC<VideoOutputProps> = ({ src }) => {
    return (
        <div className="VideoOutput">
            <video className="Player" ref={src} controls />
        </div>
    );
}

export default VideoOutput;
