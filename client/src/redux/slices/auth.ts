import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import axios from "axios";

const reducerName = 'auth';

export const loadUser = createAsyncThunk(`${reducerName}/loadUser`, async () => {
    const {data} = await axios.get('http://localhost:9000/user', {
        withCredentials: true,
    });

    return data
});


// todo types
interface AuthState {
    isAuth: boolean,
    user: Record<string, unknown> | null | any,
    isLoaded: boolean;
}

const initialState: AuthState = {
    isAuth: false,
    user: null,
    isLoaded: false
};

export const authSlice = createSlice({
    name: reducerName,
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loadUser.pending, (state) => {
            state.isAuth = false;
            state.isLoaded = false
            state.user = null;
        });
        builder.addCase(loadUser.fulfilled, (state, {payload}) => {
            state.isAuth = true;
            state.isLoaded = true;
            state.user = payload;
        });
        builder.addCase(loadUser.rejected, (state) => {
            state.isAuth = false;
            state.isLoaded = true;
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

export const getUser = (state: RootState) => state[reducerName].user;
export const getIsAuth = (state: RootState) => state[reducerName].isAuth;
export const getIsLoaded = (state: RootState) => state[reducerName].isLoaded;

export default authSlice.reducer;
