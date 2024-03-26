import { LinearProgress, Box } from '@mui/material';

const LinearLoader = () => {
    return (
        <Box sx={{ 
            width: '50%', // Full width
            position: 'fixed', // Fixed position to ensure it's always centered regardless of page content
            top: '50%', // Center vertically
            
            transform: 'translateY(-50%)', // Adjust centering precisely
        }}>
            <LinearProgress sx={{ 
                bgcolor: 'transparent',
                '& .MuiLinearProgress-bar': {
                    backgroundColor: 'orange', // Orange color
                },
            }} />
        </Box>
    );
};

export default LinearLoader;
