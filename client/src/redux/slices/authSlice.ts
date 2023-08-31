import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: {},
  signInPopup: false,
  signUpPopup: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //  increment: (state) => {
    //    state.value += 1;
    //  },
    //  incrementByAmount: (state, action) => {
    //    state.value += action.payload;
    //  },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setSignInPopup: (state, action) => {
      state.signInPopup = action.payload;
    },
    setSignUpPopup: (state, action) => {
      state.signUpPopup = action.payload;
    },
  },
});

export const { setIsAuth, setSignInPopup, setSignUpPopup } = authSlice.actions;

export default authSlice.reducer;
