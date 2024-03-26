import React, { ReactNode, createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContextType } from '../../Types/appContext';
import { updateContext, selectCurrentAppContext } from '../Redux/authSlice';

interface AppContextProviderProps {
    children: ReactNode;
}

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