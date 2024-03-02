import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    const navigateToDataAnalysis = () => {
        navigate('/app/data-analysis');
    }
    const navigateToYouTubeManager = () => {
        navigate('/app/youtube-manager');
    }
    return (
        <div>
            <button onClick={navigateToDataAnalysis}>Data Analysis</button>
            <button onClick={navigateToYouTubeManager}>YouTube Manager</button>
        </div>
    )
}

