import { createContext, useContext } from 'react';
import { AppContextValue } from './AppContextProvider';




export const AppContext = createContext<AppContextValue | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
