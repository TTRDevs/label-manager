// src/features/page/pageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PageState {
  isLoading: boolean;
}

const initialState: PageState = {
  isLoading: true, // Assuming the page starts with loading true
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = pageSlice.actions;

export default pageSlice.reducer;
