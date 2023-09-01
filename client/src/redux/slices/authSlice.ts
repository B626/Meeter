import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface AuthState {
  isAuth: boolean,
  user: object,
  signInPopup: boolean,
  signUpPopup: boolean
}

const initialState: AuthState = {
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
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setSignInPopup: (state, action: PayloadAction<boolean>) => {
      state.signInPopup = action.payload;
    },
    setSignUpPopup: (state, action: PayloadAction<boolean>) => {
      state.signUpPopup = action.payload;
    },
  },
});

export const { setIsAuth, setSignInPopup, setSignUpPopup } = authSlice.actions;

export const selectCount = (state: RootState) => state.auth

export default authSlice.reducer;
