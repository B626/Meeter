import React from "react";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import LearnMorePage from "./pages/LearnMorePage";
import ProductsPage from "./pages/ProductsPage";
import SafetyPage from "./pages/SafetyPage";
import SupportPage from "./pages/SupportPage";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/learnmore" element={<LearnMorePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/safety" element={<SafetyPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Route>
    </Routes>
  );
};

export default App;
