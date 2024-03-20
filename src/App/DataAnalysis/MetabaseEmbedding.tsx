import { useState, useEffect, useCallback } from 'react';
import './MetabaseEmbedding.css';
import axios from 'axios';

const MetabaseEmbedding = () => {
    const [iframeUrl, setIframeUrl] = useState('');
    const [isDashboardOn, setIsDashboardOn] = useState(false);

    // Function to attempt the fetch with retries
    const fetchMetabaseDashboardURL = useCallback((retries = 3, interval = 3000) => {
        const makeRequest = () => {
            axios.get('https://server.recordlabelmanager.com/api/metabase')
                .then(response => {
                    setIframeUrl(response.data.iframeUrl);
                    setIsDashboardOn(true);
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
    }, []); // Dependencies array is empty, meaning this function is created once per component instance

    useEffect(() => {
        fetchMetabaseDashboardURL(); // Call the function with retries
    }, [fetchMetabaseDashboardURL]); // Now fetchMetabaseDashboardURL is listed as a dependency

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

// import { useState, useEffect } from 'react';
// import './MetabaseEmbedding.css';
// import axios from 'axios';

// const MetabaseEmbedding = () => {
//     const [iframeUrl, setIframeUrl] = useState('');
//     const [isDashboardOn, setIsDashboardOn] = useState(false);

//     useEffect(() => {
//         axios.get('https://server.recordlabelmanager.com/api/metabase')
//             .then(response => {
//                 setIframeUrl(response.data.iframeUrl);
//                 setIsDashboardOn(true);
//             })
//             .catch(error => {
//                 console.error('Error fetching Metabase Dashboard URL', error);
//             });
//     }, []);
//     return (
//         <div className="metabase-embedding-container">
//             {isDashboardOn ? (
//                 <iframe
//                     src={iframeUrl}
//                     width="100%"
//                     height="100%"
//                 ></iframe>
//             ) : (
//                 <>
//                     <p>Loading dashboard...</p>
//                 </>
//             )}

//         </div>
//     );
// };

// export default MetabaseEmbedding;
