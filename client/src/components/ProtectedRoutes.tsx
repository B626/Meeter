import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {useAuth} from "../hooks/useAuth";
import {Navigate, Outlet} from "react-router-dom";
import {useGetUser} from "../hooks/useGetUser";

const ProtectedRoutes = () => {
    const {isAuth, isLoaded} = useAuth();

    useGetUser();

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
