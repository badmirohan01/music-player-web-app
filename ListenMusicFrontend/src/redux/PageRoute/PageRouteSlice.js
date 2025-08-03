import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const PageRouteSlice = createSlice({
  name: "pageRoute",
  initialState,
  reducers: {
    setPageRoute: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPageRoute } = PageRouteSlice.actions;
export default PageRouteSlice.reducer;
