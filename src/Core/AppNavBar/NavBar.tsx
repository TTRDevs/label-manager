import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/store';
import { logout } from '../Auth/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

export default function NavBar() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isLoginPage = location.pathname === '/login';

  return (
    <AppBar position="static" sx={{ width: "100%", backgroundColor: "#ec991d" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, color: 'white', textDecoration: 'none' }}
          component={RouterLink}
          to="/home"
        >
          Label Manager
        </Typography>
        {/* Only show the logout button if the user is authenticated and not on the login page */}
        {!isLoginPage && isAuthenticated && (
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}