import React from "react";
import Nav from "./components/Nav";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import LearnMorePage from "./pages/LearnMorePage";
import ProductsPage from "./pages/ProductsPage";
import SafetyPage from "./pages/SafetyPage";
import SupportPage from "./pages/SupportPage";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [signUpPopup, setSignUpPopup] = useState(false);
  const [signInPopup, setSignInPopup] = useState(false);
  return (
    <>
      <Nav
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        signInPopup={signInPopup}
        signUpPopup={signUpPopup}
        setSignInPopup={setSignInPopup}
        setSignUpPopup={setSignUpPopup}
      />
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              signUpPopup={signUpPopup}
              setSignUpPopup={setSignUpPopup}
              signInPopup={signInPopup}
              setSignInPopup={setSignInPopup}
            />
          }
        />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/learnmore" element={<LearnMorePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/safety" element={<SafetyPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </>
  );
};

export default App;
