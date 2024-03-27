import { Box, Typography } from "@mui/material";
import { useState, useEffect } from 'react';
import VideoMakerLogic from "./VideoMakerLogic";
import LinearLoader from "../../Core/Utilities/LinearLoader";
import './VideoMakerHome.css';

export default function VideoMakerHome() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Simulate a load
        const timeout = setTimeout(() => {
            setIsLoaded(true);
        }, 3000); // Set the delay as required

        return () => clearTimeout(timeout);
    }, []);

    return (
        <Box sx={{ height: "calc(100vh - 120px)", display: "flex", flexDirection: "column", justifyContent: "left", width: "calc(100vw - 60px)", marginTop: "100px", marginBottom: "20px", bottom: "0px", position: 'relative' }}>
            {!isLoaded ? (
                <div className="loadingContainer">
                    <LinearLoader />
                    <div style={{ marginTop: '40px' }}> {/* Added div for spacing */}
                        <p style={{ color: "darkgrey", backgroundColor: "white", fontSize: "1.5em", padding: "10px", borderRadius: "100px" }}>Loading Video Maker</p>
                    </div>
                </div>
            ) : (
                <>
                    <Box sx={{ marginBottom: "20px" }}>
                        <Typography>
                            <div className="Title">
                                Video Maker
                            </div>
                            <div className="Subtitle">
                                This module is currently under development and loading time can be long for complete songs. We recommend using audio snippets for now.
                            </div>
                        </Typography>
                    </Box>
                    <hr style={{ left: "0px", width: "100%" }} />
                    <Box sx={{ marginTop: "40px" }}>
                        <VideoMakerLogic />
                    </Box>
                </>
            )}
        </Box>
    );
}
