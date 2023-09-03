import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import axios from "axios";

const reducerName = 'auth';

export const loadUser = createAsyncThunk(`${reducerName}/loadUser`, async () => {

    const user = await axios.get('http://localhost:9000/user');

    return user
});


// todo types
interface AuthState {
    isAuth: boolean,
    user: Record<string, unknown> | null | any,
}

const initialState: AuthState = {
    isAuth: false,
    user: {},
};

export const authSlice = createSlice({
    name: reducerName,
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loadUser.pending, (state) => {
            state.user = null;
        });
        builder.addCase(loadUser.fulfilled, (state, {payload}) => {
            state.user = payload;
        });
        builder.addCase(loadUser.rejected, (state) => {
            state.user = null;
        });
    },
    reducers: {
        setUser: (state, action: PayloadAction<Record<string, unknown>>) => {
            state.user = action.payload
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
    },
});

export const {setIsAuth, setUser} = authSlice.actions;

export const getUser = (state: RootState) => state.auth.user;
export const getIsAuth = (state: RootState) => state.auth.isAuth;

export default authSlice.reducer;
