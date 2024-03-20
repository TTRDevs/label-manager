import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0 ,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface InputFileUploadProps {
  handleFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
  media: string;
  style?: React.CSSProperties; // Add this line to accept style props
}

const InputFileUpload: React.FC<InputFileUploadProps> = ({ handleFunc, media, style }) => {
  return (
    <Button size='large' component="label" variant="contained" startIcon={<CloudUploadIcon />} style={style}>
      Upload {media} file
      <VisuallyHiddenInput type="file" onChange={handleFunc} id={media} accept={`${media}/*`} />
    </Button>
  );
}

export default InputFileUpload;