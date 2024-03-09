
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import MetabaseDashboards from '../../App/DataAnalysis/MetabaseDashboards';
import YouTubeManager from '../../App/YoutubeManager/YouTubeManager';
import { Navigate, useNavigate } from 'react-router-dom';
interface CardProp {
    name: string;
}
export default function LandingPageIndividualCard({ name }: CardProp) {
    const navigate = useNavigate();
    const dataAnalysisImage = "https://canadacollege.edu/menloparksite/programs/Data-Analytics-What-is-Data-Analytics-Edureka-1.png";
    const videoMakerImage = "https://framerusercontent.com/images/n0CatVZHX1z26fHLwC3U6d1wWiQ.jpeg";
    const dataAnalysisText = "Data Analysis module presents interactive dashboards using Metabase. Allowing users to have a complete view of their data and collect valuable Insights";
    const videoMakerText = "Video Maker module allows for automatic creation of videos via image and song upload. New feature of automatic video uploading coming soon";
    const dataAnalysisTitle = "Data Analysis";
    const videoMakerTitle = "Video Maker";

    const getImage = (name: String) => {
        if (name === 'data-analysis') {
            return dataAnalysisImage
        } else {
            return videoMakerImage
        }
    }
    const getText = (name: String) => {
        if (name === 'data-analysis') {
            return dataAnalysisText
        } else {
            return videoMakerText
        }
    }
    const getTitle = (name: String) => {
        if (name === 'data-analysis') {
            return dataAnalysisTitle
        } else {
            return videoMakerTitle
        }
    }
    const getModule = (name: String) => {
        if (name === 'data-analysis') {
            return navigate('/app/data-analysis')
        } else {
            return navigate('/app/youtube-manager')
        }
    }
return (
    <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => getModule(name)}>
            <CardMedia
                component="img"
                height="140"
                image={getImage(name)}
                alt={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {getTitle(name)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {getText(name)}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
);
}