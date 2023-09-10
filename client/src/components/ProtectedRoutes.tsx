import React, {useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import {useAuth} from "../hooks/useAuth";
import {Navigate, Outlet} from "react-router-dom";
import {useAppDispatch} from "../redux/hooks";
import {loadUser} from "../redux/slices";

const ProtectedRoutes = () => {
    const {isAuth, isLoaded} = useAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    // todo create loader for this case
    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return isLoaded && isAuth ? (
        <section className="app">
            <Header/>
            <main className="outlet-wrapper">
                <Outlet/>
            </main>
            <Footer/>
        </section>
    ) : <Navigate to="/"/>
};

export default ProtectedRoutes;
