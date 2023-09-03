import React from "react";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import LearnMorePage from "./pages/LearnMorePage";
import ProductsPage from "./pages/ProductsPage";
import SafetyPage from "./pages/SafetyPage";
import SupportPage from "./pages/SupportPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/learnmore" element={<LearnMorePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/safety" element={<SafetyPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
