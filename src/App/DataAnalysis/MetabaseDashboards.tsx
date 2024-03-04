import { useEffect, useState } from 'react';
import axios from 'axios'; 
import MetabaseEmbedding from "./MetabaseEmbedding";

export default function MetabaseDashboards() {
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/bandcamp/credentials');
                console.log("Data fetched from backend:", response.data);
                setFetchedData(response.data);
                setIsDataFetched(true);
            } catch (error) {
                console.error('Error fetching data from backend', error);
            }
        };
        fetchData();
    }, []);
    

    return (
        <div>
            {isDataFetched ? <MetabaseEmbedding /> : <p>Loading data...</p>}
            {fetchedData}
        </div>
    );
}
