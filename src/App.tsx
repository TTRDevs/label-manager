import { useEffect, useRef, useState } from 'react';
import NavBar from './Core/AppNavBar/NavBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Outlet } from "react-router-dom";
import './AppStyles.css';

export default function App() {
  const [navBarHeight, setNavBarHeight] = useState(0);
  // Define the type of the ref as HTMLDivElement
  const navBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navBarRef.current) {
      // Use clientHeight which is a property of HTMLDivElement
      setNavBarHeight(navBarRef.current.clientHeight);
    }
  }, []);

  return (
    <Container disableGutters maxWidth={false} className="mainContainer">
      <div ref={navBarRef}>
        <NavBar />
      </div>
      <Paper elevation={3} className="appContentContainer" square sx={{ 
        minHeight: `calc(100vh - ${navBarHeight}px)`, // Adjust height based on NavBar
        position: 'relative',
        backgroundColor: "white",
        // pt: `${navBarHeight}px`, // Push content down by the dynamic height of the NavBar
        pb: 0,
        mt: 0,
        mb: 0,
      }}>
        <Outlet />
      </Paper>
    </Container>
  );
}
