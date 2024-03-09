import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'
export interface VideoContextType {
    uuid: string;
    setUuid: (uid: string) => void;
}

export interface VideoProviderProps {
    children: ReactNode;
}

export const VideoContext = createContext<VideoContextType>({
    uuid: '',
    setUuid: () => { },
});

export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
    const [uuid, setUuid] = useState<string>('');
    useEffect(() => {
        setUuid(uuidv4())
    }, [])
    return (
        <VideoContext.Provider value={{ uuid, setUuid }}>
            {children}
        </VideoContext.Provider>
    );
};
