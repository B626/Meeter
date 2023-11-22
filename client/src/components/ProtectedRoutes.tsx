import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Navigate, Outlet } from "react-router-dom";
import { useProtectedRoutes } from "../hooks/useProtectedRoutes";

const ProtectedRoutes = () => {
  const {isLoaded, isAuth} = useProtectedRoutes()
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return isLoaded && isAuth ? (
    <section className="app">
      <Header />
      <main className="outlet-wrapper">
        <Outlet />
      </main>
      <Footer />
    </section>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoutes;
