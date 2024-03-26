// src/features/apiData/apiDataSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ErrorRequestHandler } from 'express';
import { ErrorPayload } from 'node_modules/vite/types/hmrPayload';

interface ApiDataState {
  data: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ApiDataState = {
  data: '',
  status: 'idle',
};

export const fetchData = createAsyncThunk(
  'apiData/fetchData',
  async (url: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const apiDataSlice = createSlice({
  name: 'apiData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<string>) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default apiDataSlice.reducer;
