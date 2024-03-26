// MetabaseEmbedding.tsx
import { useEffect, useCallback } from 'react';
import './MetabaseEmbedding.css';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from './../../Core/Redux/hooks';
import { setIframeUrl, setIsDashboardOn } from './../../Core/Redux/metabaseSlice';

const MetabaseEmbedding = () => {
    const dispatch = useAppDispatch();
    const iframeUrl = useAppSelector((state) => state.metabase.iframeUrl);
    const isDashboardOn = useAppSelector((state) => state.metabase.isDashboardOn);

    const fetchMetabaseDashboardURL = useCallback((retries = 3, interval = 3000) => {
        const makeRequest = () => {
            axios.get('https://server.recordlabelmanager.com/api/metabase')
                .then(response => {
                    dispatch(setIframeUrl(response.data.iframeUrl));
                    dispatch(setIsDashboardOn(true));
                })
                .catch(error => {
                    console.error('Error fetching Metabase Dashboard URL from Server', error);
                    if (retries > 0) {
                        setTimeout(() => {
                            fetchMetabaseDashboardURL(retries - 1, interval);
                        }, interval);
                    }
                });
        };
        makeRequest();
    }, [dispatch]);

    useEffect(() => {
        fetchMetabaseDashboardURL(); 
    }, [fetchMetabaseDashboardURL]);

    return (
        <div className="metabase-embedding-container">
            {isDashboardOn ? (
                <iframe
                    src={iframeUrl}
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    allowTransparency
                ></iframe>
            ) : (
                <p>Loading dashboard...</p>
            )}
        </div>
    );
};

export default MetabaseEmbedding;
