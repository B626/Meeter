import {useEffect} from "react";
import {loadUser, getUser} from "../redux/slices";
import {useAppDispatch, useAppSelector} from "../redux/hooks";

export const useGetUser = () => {
    const user = useAppSelector(getUser);

    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch(loadUser());
    }, [dispatch]);

    return user;
}
