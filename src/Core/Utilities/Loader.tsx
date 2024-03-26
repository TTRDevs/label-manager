import { CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // takes full viewport height
    }}>
      <CircularProgress sx={{ color: 'orange' }} />
      <p>Loading...</p>
    </div>
  );
}
