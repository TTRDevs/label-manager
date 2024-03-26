// src/features/video/videoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoState {
  videoUrl: string | null;
  uuid: string;
  loaded: boolean;
  audioFile: File | null;
  imageFile: File | null;
  videoLoading: boolean | null;
  audioLoaded: boolean | null;
  imageLoaded: boolean | null;
  videoNotStarted: boolean;
}


const initialState: VideoState = {
  videoUrl: null,
  uuid: '',
  loaded: false,
  audioFile: null,
  imageFile: null,
  videoLoading: null,
  audioLoaded: null,
  imageLoaded: null,
  videoNotStarted: true,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setUuid: (state, action: PayloadAction<string>) => {
      state.uuid = action.payload;
    },

    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setAudioFile: (state, action: PayloadAction<File | null>) => {
      state.audioFile = action.payload;
      state.audioLoaded = !!action.payload;
    },
    setImageFile: (state, action: PayloadAction<File | null>) => {
      state.imageFile = action.payload;
      state.imageLoaded = !!action.payload;
    },
    setVideoLoading: (state, action: PayloadAction<boolean | null>) => {
      state.videoLoading = action.payload;
    },
    setVideoNotStarted: (state, action: PayloadAction<boolean>) => {
      state.videoNotStarted = action.payload;
    },
    resetVideoCreationState: (state) => {
      state.audioFile = null;
      state.imageFile = null;
      state.videoLoading = null;
      state.audioLoaded = null;
      state.imageLoaded = null;
      state.videoNotStarted = true;
    },
  },
});

export const {
  setLoaded,
  setAudioFile,
  setImageFile,
  setVideoLoading,
  setVideoNotStarted,
  resetVideoCreationState,
  setUuid
} = videoSlice.actions;

export default videoSlice.reducer;
