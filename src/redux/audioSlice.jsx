import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  audioSrc: null, 
  effect: 'rainbowBars',  
  isFileUploaded: false,  
};

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setAudioSrc: (state, action) => {
      state.audioSrc = action.payload;  
      state.isFileUploaded = true;
    },
    resetAudioSrc: (state) => {
      state.audioSrc = null;  
      state.isFileUploaded = false;
    },
    setEffect: (state, action) => {
      state.effect = action.payload;  
    },
  },
});

export const { setAudioSrc, resetAudioSrc, setEffect } = audioSlice.actions;
export default audioSlice.reducer;
