import { createSlice } from "@reduxjs/toolkit";

//!INITIAL STATE
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON / parseFloat(localStorage.getItem("userInfo")) || null,
  },
  reducers: {
    //LOGIN
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    //LOGOUT
    logoutAction: (state, action) => {
      state.user = null;
    },
  },
});
//!GENERATE ACTIONS
export const { loginAction, logoutAction } = authSlice.actions;
//!GENERATE REDUCERS
const authReducer = authSlice.reducer;
export default authReducer;
