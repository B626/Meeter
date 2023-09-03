import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {getIsAuth, getIsLoaded, setIsAuth, setUser} from "../redux/slices";

export const useAuth = () => {
    const isAuth = useAppSelector(getIsAuth);
    const isLoaded = useAppSelector(getIsLoaded);
    const dispatch = useAppDispatch();

    const handleIsAuth = (value: boolean) => dispatch(setIsAuth(value));
    const handleUser = (user: Record<string, unknown>) => dispatch(setUser(user));

    return {
        handleIsAuth,
        handleUser,
        isAuth,
        isLoaded
    }
}
