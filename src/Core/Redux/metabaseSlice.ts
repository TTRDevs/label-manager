// src/features/metabase/metabaseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MetabaseState {
  iframeUrl: string;
  isDashboardOn: boolean;
}

const initialState: MetabaseState = {
  iframeUrl: '',
  isDashboardOn: false,
};

export const metabaseSlice = createSlice({
  name: 'metabase',
  initialState,
  reducers: {
    setIframeUrl: (state, action: PayloadAction<string>) => {
      state.iframeUrl = action.payload;
    },
    setIsDashboardOn: (state, action: PayloadAction<boolean>) => {
      state.isDashboardOn = action.payload;
    },
  },
});

export const { setIframeUrl, setIsDashboardOn } = metabaseSlice.actions;

export default metabaseSlice.reducer;
