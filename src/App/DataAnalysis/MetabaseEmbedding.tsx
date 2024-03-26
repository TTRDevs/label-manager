import { useEffect, useCallback } from 'react';
import './MetabaseEmbedding.css';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from './../../Core/Redux/hooks';
import { setIframeUrl, setIsDashboardOn } from './../../Core/Redux/metabaseSlice';
import Loader from "./../../Core/Utilities/Loader"
import { setLoading } from '../../Core/Redux/pageSlice'

const MetabaseEmbedding = () => {
    const dispatch = useAppDispatch();
    const iframeUrl = useAppSelector((state) => state.metabase.iframeUrl);
    const isDashboardOn = useAppSelector((state) => state.metabase.isDashboardOn);
    
    
    useEffect(() => {
        // Assume MetabaseEmbedding fetches some data or has some initialization that takes time
        dispatch(setLoading(true)); // Assume loading starts

        // Simulate an asynchronous operation like fetching embedding data
        const simulateDataLoading = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
            dispatch(setLoading(false)); // Assume loading ends after data is fetched or initial setup is done
        };

        simulateDataLoading();
    }, [dispatch]);

    const fetchMetabaseDashboardURL = useCallback((retries = 3, interval = 3000) => {
        dispatch(setIsDashboardOn(false)); // Ensure loading state is active before fetching
        const makeRequest = () => {
            axios.get('https://server.recordlabelmanager.com/api/metabase')
                .then(response => {
                    dispatch(setIframeUrl(response.data.iframeUrl));
                    dispatch(setIsDashboardOn(true)); // Dashboard is now on, loading is done
                })
                .catch(error => {
                    console.error('Error fetching Metabase Dashboard URL from Server', error);
                    if (retries > 0) {
                        setTimeout(() => {
                            fetchMetabaseDashboardURL(retries - 1, interval);
                        }, interval);
                    }
                    // Consider setting isDashboardOn to false or dispatching another action on final failure
                });
        };
        makeRequest();
    }, [dispatch]);

    useEffect(() => {
        fetchMetabaseDashboardURL(); 
    }, [fetchMetabaseDashboardURL]);

    return (
        <div className="metabase-embedding-container" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isDashboardOn ? (
                <iframe
                    src={iframeUrl}
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    allowTransparency
                ></iframe>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default MetabaseEmbedding;
