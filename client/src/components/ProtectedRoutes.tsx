import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../hooks/useAuth";
import { useGetUser } from "../hooks/useGetUser";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = useGetUser()
  const isAuth = useAuth()
  return isAuth ? (
    <section className="app">
      <Header />
      <main className="outlet-wrapper">
        <Outlet />
      </main>
      <Footer />
    </section>
  ) : <Navigate to="/" />
};

export default ProtectedRoutes;
