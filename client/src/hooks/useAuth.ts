import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {getIsAuth, setIsAuth, setUser} from "../redux/slices";

export const useAuth = () => {
    const isAuth = useAppSelector(getIsAuth);

    const dispatch = useAppDispatch();

    const handleIsAuth = (value: boolean) => dispatch(setIsAuth(value));
    const handleUser = (user: Record<string, unknown>) => dispatch(setUser(user));

    return {
        handleIsAuth,
        handleUser,
        isAuth
    }
}
