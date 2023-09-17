import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: {}
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true
      state.user = action.payload
    },
    signUp: (state, action) => {
      state.isLogin = true
      state.user = action.payload
    },
    logOut: (state, action) => {
      state.isLogin = false
      state.user = null
    }
  }
})
export const { login, signUp, logOut } = userSlice.actions;
export default userSlice.reducer    