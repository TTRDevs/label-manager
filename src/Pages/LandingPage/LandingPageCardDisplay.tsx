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
            gridTemplateColumns: matches ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'start',
            maxWidth: '1200px',
            margin: '0 auto',
            gridAutoFlow: 'row dense',
        }}>
            {moduleNames.map((name) => (
                <LandingPageIndividualCard key={name} title={name} />
            ))}
        </Box>
    );
}
