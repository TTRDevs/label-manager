
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import da from './../../assets/da.png'
import vm from './../../assets/vm.png'


const dataAnImage = da
const videoMkrImage = vm

interface CardProp {
    name: string;
}
export default function LandingPageIndividualCard({ name }: CardProp) {
    const navigate = useNavigate();
    
    
    const dataAnalysisText = "Data Analysis module presents interactive dashboards using Metabase. Allowing users to have a complete view of their data and collect valuable Insights";
    const videoMakerText = "Video Maker module allows for automatic creation of videos via image and song upload. New feature of automatic video uploading coming soon";
    const dataAnalysisTitle = "Data Analysis";
    const videoMakerTitle = "Video Maker";

    const getImage = (name: string) => {
        if (name === 'data-analysis') {
            return dataAnImage
        } else {
            return videoMkrImage
        }
    }
    const getText = (name: string) => {
        if (name === 'data-analysis') {
            return dataAnalysisText
        } else {
            return videoMakerText
        }
    }
    const getTitle = (name: string) => {
        if (name === 'data-analysis') {
            return dataAnalysisTitle
        } else {
            return videoMakerTitle
        }
    }
    const getModule = (name: string) => {
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