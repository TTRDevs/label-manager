import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit'; // Use combineReducers from @reduxjs/toolkit
import authSlice from '../Auth/authSlice';
import videoSlice from './videoSlice';

// Inside your store.ts



const rootReducer = combineReducers({
  auth: authSlice,
  video: videoSlice, // Add the video slice reducer here
});

// The rest of your store setup remains the same


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
