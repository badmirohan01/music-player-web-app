import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    NavbarItem: "music"
}

export const NavbarSlice = createSlice({
  name: 'Navbar',
  initialState,
  reducers: {
    setNavbar: (state, action)=>{state.NavbarItem = action.payload}
  }
})

export const { setNavbar } = NavbarSlice.actions
export default NavbarSlice.reducer