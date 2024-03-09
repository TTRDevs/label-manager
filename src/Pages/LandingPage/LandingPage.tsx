import { useNavigate } from "react-router-dom";
import LandingPageCardDisplay from "./LandingPageCardDisplay";

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
            <LandingPageCardDisplay/>            
        </div>
    )
}

