import React, { ReactNode, createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContextType } from '../../Types/appContext';
import { updateContext, selectCurrentAppContext } from '../Auth/authSlice';

interface AppContextProviderProps {
    children: ReactNode;
}

// Define a new type for the context that includes both the appContext and setAppContext.
export interface AppContextValue {
    appContext: AppContextType;
    setAppContext: Dispatch<SetStateAction<AppContextType>>;
}

export const AppContext = createContext<AppContextValue | null>(null);

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const currentContext = useSelector(selectCurrentAppContext);
    const dispatch = useDispatch();
    const [appContext, setAppContext] = useState<AppContextType>(currentContext);

    useEffect(() => {
        setAppContext(currentContext);
    }, [currentContext]);

    const handleSetAppContext: Dispatch<SetStateAction<AppContextType>> = (context) => {
        // Check if context is a function and call it with the previous state if it is
        const value = context instanceof Function ? context(appContext) : context;
        dispatch(updateContext(value));
        setAppContext(value);
    };
    return (
        <AppContext.Provider value={{ appContext, setAppContext: handleSetAppContext }}>
            {children}
        </AppContext.Provider>
    );
};

// Note: Ensure the updateContext action creator is properly typed to handle AppContextType as an argument.
