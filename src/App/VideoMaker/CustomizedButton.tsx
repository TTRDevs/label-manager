import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { orange } from '@mui/material/colors';

const ColorButton = styled(Button)(() => ({
   width: "225px",
   height: "5vh",
   textWrap: "nowrap",
   maxWidth: "40%",
   maxHeight: "5vh",
   flexDirection: 'column',
   color: "white",
   backgroundColor: orange[300],
   '&:hover': {
      backgroundColor: orange[500],
   },
}));

interface CustomizedButtonProps {
   clickFunc: () => void;
}

export default function CustomizedButton({ clickFunc }: CustomizedButtonProps) {
   return (
      <>
         <ColorButton size='large' variant="contained" onClick={clickFunc} >
            Create video
         </ColorButton >
      </>
   );
}