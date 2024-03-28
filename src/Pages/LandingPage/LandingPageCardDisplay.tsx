import LandingPageIndividualCard from "./LandingPageIndividualCard";
import Box from '@mui/material/Box';
import moduleCardData from './modulesCardData';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function LandingPageCardDisplay() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const moduleNames = Object.keys(moduleCardData); 

    return (
        <Box sx={{ 
            display: 'grid',
            position: 'relative', // Add a relative position to ensure the grid doesn't overflow the container
            gridTemplateColumns: matches ? 'repeat(1, 1fr)' : 'repeat(4, 1fr)',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'start',
            maxWidth: '1200px',
            minWidth: '400px',
            margin: '1rem auto', // Add a top margin to ensure cards don't go under the header
            gridAutoFlow: 'row dense',
            padding: '2rem', // Add padding to maintain space around the edges
        }}>
            {moduleNames.map((name) => (
                <LandingPageIndividualCard key={name} title={name} />
            ))}
        </Box>
    );
}
