import LandingPageIndividualCard from "./LandingPageIndividualCard";
import Box from '@mui/material/Box';

export default function LandingPageCardDisplay() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, justifyContent: 'center' }}>
            <LandingPageIndividualCard name={'data-analysis'} />
            <LandingPageIndividualCard name={'video-maker'} />
        </Box>
    );
}
