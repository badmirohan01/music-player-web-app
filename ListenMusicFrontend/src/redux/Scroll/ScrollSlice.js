import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  targetSection: null,
};

export const ScrollSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    setTargetSection: (state, action) => {
      state.targetSection = action.payload;
    },
  },
});

export const { setTargetSection } = ScrollSlice.actions;
export default ScrollSlice.reducer;
