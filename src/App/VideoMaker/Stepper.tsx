import React from 'react';
import { Stepper, Step, StepLabel, StepIconProps, CircularProgress, Box } from '@mui/material';
import Check from '@mui/icons-material/Check';

function StepIcon(props: StepIconProps) {
  const { active, completed } = props;

  const iconContainerStyle = {
    backgroundColor: 'orange', // Set the background color to orange
    color: 'white', // Set the icon/text color to white
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '24px',
    height: '24px',
  };

  return (
    <div>
      {completed ? (
        <Box sx={{ ...iconContainerStyle }}>
          <Check style={{ color: 'white' }} />
        </Box>
      ) : active ? (
        <Box sx={{ ...iconContainerStyle, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size={24} style={{ color: 'white' }} />
        </Box>
      ) : (
        <Box sx={{ ...iconContainerStyle }}>{props.icon}</Box>
      )}
    </div>
  );
}

interface AudioVideoProcessStepperProps {
  activeStep: number;
  completedSteps: number[];
}

const AudioVideoProcessStepper: React.FC<AudioVideoProcessStepperProps> = ({ activeStep, completedSteps }) => {
  const steps = ['Analyzing audio', 'Processing audio to video', 'Processing image to video', 'Putting it all together'];

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={label} completed={completedSteps.includes(index)}>
          <StepLabel StepIconComponent={StepIcon} sx={{ '.MuiStepLabel-label': { color: 'white', '&.Mui-completed': { color: 'white' }, '&.Mui-active': { color: 'white' }, }, '.MuiStepIcon-root': { color: 'orange', '&.Mui-completed': { color: 'orange' }, '&.Mui-active': { color: 'orange' }, } }}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default AudioVideoProcessStepper;
