// src/features/video/videoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoState {
  videoUrl: string | null;
}

const initialState: VideoState = {
  videoUrl: null,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideoUrl: (state, action: PayloadAction<string | null>) => {
      state.videoUrl = action.payload;
    },
  },
});

export const { setVideoUrl } = videoSlice.actions;

export default videoSlice.reducer;
