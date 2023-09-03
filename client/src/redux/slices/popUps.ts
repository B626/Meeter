import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../store'

const reducerName = 'popUps';


interface IPopUps {
    signInPopup: boolean,
    signUpPopup: boolean
}

const initialState: IPopUps = {
    signInPopup: false,
    signUpPopup: false,
};

export const popUpsSlice = createSlice({
    name: reducerName,
    initialState,
    reducers: {
        setSignInPopup: (state, action: PayloadAction<boolean>) => {
            state.signInPopup = action.payload;
        },
        setSignUpPopup: (state, action: PayloadAction<boolean>) => {
            state.signUpPopup = action.payload;
        },
    },
});

export const {setSignInPopup, setSignUpPopup} = popUpsSlice.actions;

export const getSignInPopup = (state: RootState) => state.popUps.signInPopup;
export const getSignUpPopup = (state: RootState) => state.popUps.signUpPopup;

export default popUpsSlice.reducer;
