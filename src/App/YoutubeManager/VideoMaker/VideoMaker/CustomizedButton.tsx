import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { pink } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
 color: theme.palette.getContrastText(pink[300]),
 backgroundColor: pink[300],
 '&:hover': {
    backgroundColor: pink[500],
 },
}));

interface CustomizedButtonProps {
 clickFunc: () => void;
}

export default function CustomizedButton({ clickFunc }: CustomizedButtonProps) {
 return (
    <ColorButton variant="contained" onClick={clickFunc}>
      go
    </ColorButton>
 );
}