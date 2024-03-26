import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from './../Core/Redux/hooks'
import { setUuid } from './../Core/Redux/videoSlice'

export interface VideoProviderProps {
    children: React.ReactNode;
}

export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        // Generate and set UUID in Redux store
        dispatch(setUuid(uuidv4()));
    }, [dispatch]);

    return <>{children}</>;
};
