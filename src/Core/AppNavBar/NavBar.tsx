import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

export default function NavBar() {

  return (
    <AppBar position="absolute" sx={{ width: "100%", backgroundColor: "#ec991d" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, color: 'white', textDecoration: 'none' }}
          component={RouterLink}
          to="/home"
        >
          Label Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
}