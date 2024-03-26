import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../Core/Redux/hooks'; // Adjust the import path as needed
import { setLoading } from '../../Core/Redux/pageSlice'; // Adjust the import path as needed
import LandingPageCardDisplay from "./LandingPageCardDisplay";
import Loader from "./../../Core/Utilities/Loader"

export default function LandingPage() {
    const isLoading = useAppSelector((state) => state.page.isLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Simulate data fetching
        const loadData = async () => {
            // Your data fetching logic here
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Example delay
            dispatch(setLoading(false)); // Update the global loading state
        };

        loadData();
    }, [dispatch]);

    return (
        <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
            {isLoading ? <Loader /> : <LandingPageCardDisplay />}
        </div>
    );
}
