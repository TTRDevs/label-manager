import { createSlice } from '@reduxjs/toolkit';
import { AppContextType } from '../../Types/appContext';
import { RootState } from '../Redux/store';

type AuthState = {
    loading: boolean;
    currentAppContext: AppContextType;
    error: string | null;
  };

const initialState: AuthState = {
    loading: false,
    error: null,
    currentAppContext: null,
};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateContext: (state, action) => {
            // Update the user details in the Redux state
            if (state.currentAppContext && action.payload) {
                state.currentAppContext = {
                    ...action.payload,
                };
            }
        },    
    },
    extraReducers: (builder) => {
        builder
            
    },
});

export const { updateContext } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentAppContext = (state: RootState) => state.auth.currentAppContext;