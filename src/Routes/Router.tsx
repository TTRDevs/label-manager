import { createBrowserRouter, Navigate } from "react-router-dom";
import Error from "../Pages/ErrorPage/Error";
import App from "../App";
import LandingPage from "../Pages/LandingPage/LandingPage";
import AppPage from "../Pages/AppPage/AppPage";
import MetabaseDashboards from "../App/DataAnalysis/MetabaseDashboards";
import YouTubeManager from "../App/YoutubeManager/YouTubeManager";
import { useSelector } from 'react-redux';
import { RootState } from '../Core/Redux/store';
import LoginPage from "../Pages/LoginPage/LoginPage";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

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
