import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0
}

export const FeaturedIndexSlice = createSlice({
  name: 'currentIndex',
  initialState,
  reducers: {
    setCurrentIndex: (state, action)=>{state.value = action.payload}
  }
})

export const { setCurrentIndex } = FeaturedIndexSlice.actions
export default FeaturedIndexSlice.reducer