import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { usePopUps } from "../hooks/usePopUps";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { signInSchema } from "../schemas/SignInSchema";
import { useValidation } from "../hooks/useValidation";

const LoginNav = () => {
  const { handleSignInPopup, handleSignUpPopup, signUpPopup, signInPopup } =
    usePopUps();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { handleIsAuth } = useAuth();
  const handleLoginButtonState = () =>
    !!((signUpPopup && pathname === "/") || signInPopup);

  const handleSignIn = () => {
    handleIsAuth(true)
    handleSignInPopup(true);
    handleSignUpPopup(false);
    navigate("/");
  };
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav__inner">
          <div className="nav__left">
            <NavLink className="logo" to={"/"}>
              <p className="logo__text">Meeter</p>
            </NavLink>
          </div>
          <div className="nav__right">
            <button className="nav__link">Language</button>
            <button
              disabled={handleLoginButtonState()}
              className="primary-button"
              onClick={handleSignIn}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoginNav;
