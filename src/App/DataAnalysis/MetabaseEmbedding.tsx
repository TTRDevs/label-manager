import { useState, useEffect } from 'react';
import './MetabaseEmbedding.css';
import axios from 'axios';

const MetabaseEmbedding = () => {
    const [iframeUrl, setIframeUrl] = useState('');
    const [isDashboardOn, setIsDashboardOn] = useState(false);


    useEffect(() => {
        // axios.get('http://localhost:3001/api/metabase')
        axios.get('https://recordlabelmanager.com:3001/api/metabase')
            .then(response => {
                setIframeUrl(response.data.iframeUrl);
                setIsDashboardOn(true);
            })
            .catch(error => {
                console.error('Error fetching Metabase dashboard URL', error);
            });
    }, []);
    return (
        <div className="metabase-embedding-container">
            {isDashboardOn ? (
                <iframe
                    src={iframeUrl}
                    width="100%"
                    height="100%"
                    allowTransparency
                ></iframe>
            ) : (
                <>
                    <p>Loading dashboard...</p>
                </>
            )}

        </div>
    );
};

export default MetabaseEmbedding;
