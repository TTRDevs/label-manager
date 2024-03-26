import { Outlet } from "react-router-dom";

export default function AppPage() {
  return (
    <div style={{display: 'flex', flexDirection:'column', justifyContent: "center", alignContent: "center", alignItems: "center"}}>
      <Outlet />
    </div>
  )
}
