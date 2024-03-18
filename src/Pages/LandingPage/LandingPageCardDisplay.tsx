// LandingPageCardDisplay.tsx
import LandingPageIndividualCard from "./LandingPageIndividualCard";
import Box from '@mui/material/Box';
import moduleCardData from './modulesCardData'; // Ensure the file name is correct
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function LandingPageCardDisplay() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md')); // 'md' is typically around 960px

    const moduleNames = Object.keys(moduleCardData); 

    return (
        <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: matches ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', // 2 columns on small screens, 4 columns otherwise
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
