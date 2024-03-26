import { createSlice } from '@reduxjs/toolkit';
import { AppContextType } from '../../Types/appContext';
import { RootState } from './store';

type AuthState = {
    loading: boolean;
    currentAppContext: AppContextType;
    error: string | null;
    isAuthenticated: boolean;
    userRole: 'admin' | 'guest' | null;
};

const initialState: AuthState = {
    loading: false,
    error: null,
    currentAppContext: null,
    isAuthenticated: false,
    userRole: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateContext: (state, action) => {
            if (state.currentAppContext && action.payload) {
                state.currentAppContext = {
                    ...action.payload,
                };
            }
        },
        login: (state, action) => {
            const { username, password } = action.payload;
            if (username === 'admin' && password === 'AdminPass123@') {
                state.isAuthenticated = true;
                state.userRole = 'admin';
            } else if (username === 'guest' && password === 'guest123@') {
                state.isAuthenticated = true;
                state.userRole = 'guest';
            } else {
                state.error = 'Invalid credentials';
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userRole = null;
        },
    },
    extraReducers: (builder) => {
        builder

    },
});

export const { updateContext, login, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentAppContext = (state: RootState) => state.auth.currentAppContext;
