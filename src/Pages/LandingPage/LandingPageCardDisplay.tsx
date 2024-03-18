// LandingPageCardDisplay.tsx
import LandingPageIndividualCard from "./LandingPageIndividualCard";
import Box from '@mui/material/Box';
import moduleCardData from './modulesCardData'; // Ensure the file name is correct

export default function LandingPageCardDisplay() {
    const moduleNames = Object.keys(moduleCardData); 

    return (
        <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', // Creates 4 columns
            gridTemplateRows: 'repeat(2, 1fr)', // Creates 2 rows
            gap: 2, // Adjust gap as needed
            justifyContent: 'center',
            alignItems: 'start', // Adjusted for grid
            maxWidth: '1200px',
            margin: '0 auto',
            gridAutoFlow: 'row dense', // Ensures filling of rows first
        }}>
            {moduleNames.map((name) => (
                <LandingPageIndividualCard key={name} title={name} />
            ))}
        </Box>
    );
}
