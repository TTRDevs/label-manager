import { useEffect, useState } from 'react';
import axios from 'axios';
import MetabaseEmbedding from "./MetabaseEmbedding";

export default function MetabaseDashboards() {
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/');
                console.log("Data fetched from backend:", response.data);
                setFetchedData(response.data);
                setIsDataFetched(true);
            } catch (error) {
                console.error('Error fetching data from backend', error);
            }
        };
        fetchData();
    }, []);

    const fetchData2 = async () => {
        try {
            const response = await axios.get('http://localhost:3001/');
            console.log("Data fetched from backend:", response.data);
            setFetchedData(response.data);
            setIsDataFetched(true);
        } catch (error) {
            console.error('Error fetching data from backend', error);
        }
    };
    return (
        <div>
            {isDataFetched ? <MetabaseEmbedding /> : (
                <>
                    <p>Loading data...</p>
                    <button onClick={fetchData2}>Try again</button>
                </>
            )}
            {fetchedData}

        </div>
    );
}
