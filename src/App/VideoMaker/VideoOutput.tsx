import React, { RefObject } from 'react';
import "./VideoOutput.css";
import { Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../Core/Redux/hooks';
import { useState } from 'react';



interface VideoOutputProps {
    src: RefObject<HTMLVideoElement>;
    clickFunc1: () => void;
    clickFunc2: () => void;
}

const ColorButton = styled(Button)(({ theme }) => ({
    flexDirection: 'column',
    color: "white",
    backgroundColor: orange[300],
    '&:hover': {
        backgroundColor: orange[500],
    },
}));

const VideoOutput: React.FC<VideoOutputProps> = ({ src, clickFunc1, clickFunc2 }: VideoOutputProps) => {
    return (

        <div>

            <div className="VideoOutput">
                <video className="Player" ref={src} controls />
            </div>
            <div className="ButtonsVideoOutput" style={{marginTop: '40px',  display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
                <ColorButton size='large' variant="contained" onClick={clickFunc1} >
                    Download video
                </ColorButton >
                <ColorButton size='large' variant="contained" onClick={clickFunc2} >
                    Create another 
                </ColorButton >
            </div>
        </div>
    );
}

export default VideoOutput;
