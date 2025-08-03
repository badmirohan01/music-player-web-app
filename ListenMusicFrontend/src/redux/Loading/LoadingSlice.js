import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false // idle | loading | succeeded | failed
};

export const LoadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.status = !state.status;
    },
  },
});

export const { setLoading } = LoadingSlice.actions;
export default LoadingSlice.reducer;
