// APIGet.tsx
import { useAppDispatch, useAppSelector } from './../../Core/Redux/hooks'
import { fetchData } from './../../Core/Redux/apiDataSlice'

type Source = {
    url: string;
}

const ApiGET = ({ url }: Source) => {
    const dispatch = useAppDispatch();
    const { data, status } = useAppSelector((state) => state.apiData);

    const handleFetchData = () => {
        dispatch(fetchData(url));
    };

    return (
        <div>
            <button onClick={handleFetchData}>Fetch Data</button>
            <div>
                {status === 'loading' && <p>Loading...</p>}
                {status === 'succeeded' && <h2>Data fetched!</h2>}
                {status === 'failed' && <p>Error fetching data</p>}
                {status === 'idle' && <p>No data fetched yet</p>}
            </div> 
        </div>
    );
};

export default ApiGET;
