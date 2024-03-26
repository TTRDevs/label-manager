import { Box, Typography } from "@mui/material";
import './VideoMakerHome.css';
import VideoMakerLogic from "./VideoMakerLogic";

export default function VideoMakerHome() {
    return (
        <Box sx={{ height: "calc(100vh - 120px)", display: "flex", flexDirection: "column", justifyContent: "left", width: "calc(100vw - 60px)", marginTop: "100px", marginBottom: "20px", bottom: "0px", position: 'relative' }}>
            <Box sx={{marginBottom: "20px"}}>
                <Typography>
                    <div className="Title">
                        Video Maker
                    </div>
                    <div className="Subtitle">
                        This module is currently under development and loading time can be long for complete songs. We recommend using audio snippets for now. 
                    </div>
                </Typography>
            </Box>
            <hr style={{left: "0px", width: "100%"}} />
            <Box sx={{ marginTop: "40px" }}>
                <VideoMakerLogic/>
            </Box>
        </Box>
    );
}
