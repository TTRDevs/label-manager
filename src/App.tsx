import NavBar from './Core/AppNavBar/NavBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Outlet } from "react-router-dom";
import './AppStyles.css';

export default function App() {
  return (
    <Container disableGutters maxWidth={false} className="mainContainer">
      <NavBar />
      <Paper elevation={3} className="appContentContainer" square sx={{ minHeight: '100vh', backgroundColor: "white", m: 0, p: 0 }}>
        <Outlet />
      </Paper>
    </Container>
  );
}
