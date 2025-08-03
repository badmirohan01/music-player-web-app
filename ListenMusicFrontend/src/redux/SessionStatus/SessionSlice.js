import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

export const SessionSlice = createSlice({
  name: "sessionStatus",
  initialState,
  reducers: {
    setSessionStatus: (state) => {
      state.isLoggedIn = state.isLoggedIn === false ? true : false;
    },
  },
});

export const { setSessionStatus } = SessionSlice.actions;
export default SessionSlice.reducer;
