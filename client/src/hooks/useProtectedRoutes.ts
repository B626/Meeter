import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { useAuth } from "./useAuth";
import { loadUser } from "../redux/slices";

export const useProtectedRoutes = () => {
   const { isAuth, isLoaded } = useAuth();
   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(loadUser());
   }, [dispatch]);

   return {
     isLoaded,
     isAuth,
   };
}