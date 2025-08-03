import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adPlaying: false,
};

export const AdPlayingSlice = createSlice({
  name: "adPlayingStatus",
  initialState,
  reducers: {
    setAdPlaying: (state) => {
      state.adPlaying = !state.adPlaying;
    },
  },
});

export const { setAdPlaying } = AdPlayingSlice.actions;
export default AdPlayingSlice.reducer;
