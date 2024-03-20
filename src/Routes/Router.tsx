import { createBrowserRouter, Navigate } from "react-router-dom";
import Error from "../Pages/ErrorPage/Error";
import App from "../App";
import LandingPage from "../Pages/LandingPage/LandingPage";
import AppPage from "../Pages/AppPage/AppPage";
import MetabaseDashboards from "../App/DataAnalysis/MetabaseDashboards";
import VideoMakerHome from "../App/VideoMaker/VideoMakerHome";
import LoginPage from "../Pages/LoginPage/LoginPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'home',
        element: (
          
            <LandingPage />
          
        ),
      },
      {
        path: 'app',
        element: (
          
            <AppPage />
          
        ),
        errorElement: <Error />,
        children: [
          {
            path: 'data-analysis',
            element: <MetabaseDashboards />,
          },
          {
            path: 'video-maker',
            element: <VideoMakerHome />,
          },
        ],
      },
      {
        path: '/error',
        errorElement: <Error />,
      },
    ],
  },
]);
