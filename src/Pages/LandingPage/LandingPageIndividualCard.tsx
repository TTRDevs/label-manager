// LandingPageIndividualCard.tsx
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import moduleCardData, { ModuleCardInfo } from './modulesCardData';

interface CardProp {
    title: string;
}

export default function LandingPageIndividualCard({ title }: CardProp) {
    const navigate = useNavigate();
    const moduleData: ModuleCardInfo | undefined = moduleCardData[title];

    if (!moduleData) {
        return null;
    }

    return (
        <Card sx={{ maxWidth: 300, height: 400, display: 'flex', flexDirection: 'column' }}>
            <CardActionArea disabled={!moduleData.available} onClick={() => navigate(moduleData.path)} sx={{ flex: 1 }}>
                <CardMedia
                    component="img"
                    image={moduleData.image}
                    alt={moduleData.title}
                    sx={{ height: 140 }} // Adjusted to control image height
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {moduleData.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {moduleData.text}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
