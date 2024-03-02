import { useState } from "react";
import axios from "axios";


type Source = {
    url: string
}
const ApiGET = ({ url }: Source) => {
    const [data, setData] = useState('');
    const source = url
    const fetchData = () => {
        axios.get(source)
            .then(response => {
                console.log(response.data);
                setData(response.data); 
            })
            .catch(error => {
                console.error('Error fetching data from service', error);
            });
    };
    return (
        <div>
            <button onClick={fetchData}>Fetch Data</button>
            <div>{data ? <h2>data fetched!</h2> : <p>No data fetched yet</p>}</div> 
        </div>
    );
};

export default ApiGET;
