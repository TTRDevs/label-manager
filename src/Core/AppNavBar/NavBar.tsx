import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function NavBar() {
  return (
    <AppBar position="static" sx={{ width: "100%", backgroundColor: "#ec991d" }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Label Manager
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
  )
}
