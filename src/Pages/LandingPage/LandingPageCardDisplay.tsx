import React from 'react';
import LandingPageIndividualCard from "./LandingPageIndividualCard";
import Box from '@mui/material/Box';
import moduleCardData from './modulesCardData';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function LandingPageCardDisplay() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const isVerySmallScreen = useMediaQuery('(max-width:500px)'); // Adjust the pixel value as needed

    const moduleNames = Object.keys(moduleCardData); 

    return (
        <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: isVerySmallScreen ? '1fr' : isSmallScreen ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'start',
            maxWidth: '1200px',
            margin: '20px auto',
            gridAutoFlow: 'row dense',
            padding: theme.spacing(2), // Adjust padding if necessary
        }}>
            {moduleNames.map((name) => (
                <LandingPageIndividualCard key={name} title={name} />
            ))}
        </Box>
    );
}
