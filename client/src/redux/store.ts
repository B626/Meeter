import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/auth"
import popUpsReducer from "./slices/popUps";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        popUps: popUpsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
