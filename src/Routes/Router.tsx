import { createBrowserRouter, Navigate } from "react-router-dom";
import Error from "../Pages/ErrorPage/Error";
import App from "../App";
import LandingPage from "../Pages/LandingPage/LandingPage";
import AppPage from "../Pages/AppPage/AppPage";
import MetabaseDashboards from "../App/DataAnalysis/MetabaseDashboards";
import YouTubeManager from "../App/YoutubeManager/YouTubeManager";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      // Redirect from "/" to "/home"
      {
        index: true, // This ensures it matches the "/" path exactly without any additional path
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: <LandingPage />,
      },
      {
        path: 'app',
        element: <AppPage />,
        errorElement: <Error />,
        children: [
            {
                path: 'data-analysis',
                element: <MetabaseDashboards />,
            },
            {
                path: 'youtube-manager',
                element: <YouTubeManager />,
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
