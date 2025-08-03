import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "signup",
};

export const AccountSlice = createSlice({
  name: "accountSignin",
  initialState,
  reducers: {
    setAccountSignin: (state) => {
      state.type = state.type === "signup" ? "signin" : "signup";
    },
  },
});

export const { setAccountSignin } = AccountSlice.actions;
export default AccountSlice.reducer;
