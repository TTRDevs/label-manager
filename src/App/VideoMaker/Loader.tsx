import { CircularProgress } from "@mui/material"

export default function Loader() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
       // takes full viewport height
    }}>
      <CircularProgress />
      <p>Loading...</p>
    </div>
  )
}
