import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <section className="app">
      <Header />
      <main className="outlet-wrapper">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};

export default Layout;
