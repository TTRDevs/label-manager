import { useState, useEffect } from 'react';
import axios from 'axios';

const MetabaseEmbedding = () => {
    const [iframeUrl, setIframeUrl] = useState('');
    const [isDashboardOn, setIsDashboardOn] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:3001/api/metabase')
            .then(response => {
                setIframeUrl(response.data.iframeUrl);
                setIsDashboardOn(true);
            })
            .catch(error => {
                console.error('Error fetching Metabase dashboard URL', error);
            });
    }, []);


    return (
        <div>
            {isDashboardOn ? (
                <iframe
                    src={iframeUrl}
                    frameBorder="0"
                    width="800"
                    height="600"
                ></iframe>
            ) : (
                <p>Loading dashboard...</p>
            )}

        </div>
    );
};

export default MetabaseEmbedding;
