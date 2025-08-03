import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idValue: "", 
};

export const FetchIdSlice = createSlice({
  name: "fetchId",
  initialState,
  reducers: {
    setFetchId: (state, action) => {
      state.idValue = action.payload;
    },
  },
});

export const { setFetchId } = FetchIdSlice.actions;
export default FetchIdSlice.reducer;