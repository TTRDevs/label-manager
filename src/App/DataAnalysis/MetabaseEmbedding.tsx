import { useState, useEffect, useCallback } from 'react';
import './MetabaseEmbedding.css';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from './../../Core/Redux/hooks';
import { setIframeUrl, setIsDashboardOn } from './../../Core/Redux/metabaseSlice';
import LinearLoader from './../../Core/Utilities/LinearLoader';

const MetabaseEmbedding = () => {
    const dispatch = useAppDispatch();
    const iframeUrl = useAppSelector((state) => state.metabase.iframeUrl);
    const isDashboardOn = useAppSelector((state) => state.metabase.isDashboardOn);
    const [minimumLoadingPassed, setMinimumLoadingPassed] = useState(false);

    const fetchMetabaseDashboardURL = useCallback((retries = 3, interval = 3000) => {
        dispatch(setIsDashboardOn(false));
        setMinimumLoadingPassed(false);
        setTimeout(() => setMinimumLoadingPassed(true), 3000);

        const makeRequest = () => {
            axios.get('https://server.recordlabelmanager.com/api/metabase')
                .then(response => {
                    dispatch(setIframeUrl(response.data.iframeUrl));
                    if (minimumLoadingPassed) {
                        dispatch(setIsDashboardOn(true));
                    }
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
    }, [dispatch, minimumLoadingPassed]);

    useEffect(() => {
        if (iframeUrl && minimumLoadingPassed) {
            dispatch(setIsDashboardOn(true));
        }
    }, [iframeUrl, minimumLoadingPassed, dispatch]);

    useEffect(() => {
        fetchMetabaseDashboardURL();
    }, [fetchMetabaseDashboardURL]);

    return (
        <div className="metabase-embedding-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {isDashboardOn ? (
                <iframe
                    src={iframeUrl}
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    allowTransparency
                ></iframe>
            ) : (
                <>
                    <LinearLoader />
                    <div style={{ marginTop: '40px' }}> {/* Added div for spacing */}
                        <p style={{ color: "black", backgroundColor: "white", fontSize: "2em", padding: "10px", borderRadius: "100px" }}>Loading Metabase</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default MetabaseEmbedding;
