import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    menuItem: "explore"
}

export const ActiveSlice = createSlice({
  name: 'activeState',
  initialState,
  reducers: {
    setActiveState: (state, action) => { state.menuItem = action.payload }
  }
})

export const { setActiveState } = ActiveSlice.actions
export default ActiveSlice.reducer