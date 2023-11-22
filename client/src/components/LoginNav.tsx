import React from "react";
import { NavLink } from "react-router-dom";
import { useLoginNav } from "../hooks/useLoginNav";

const LoginNav = () => {
  const {
    setLanguage,
    selectedLanguage,
    handleLoginButtonState,
    handleSignIn,
    t
  } = useLoginNav();
  
  return (
    <nav className="login-nav">
      <div className="container">
        <div className="login-nav__inner">
          <div className="login-nav__left">
            <NavLink className="logo" to={"/"}>
              <p className="logo__text">Meeter</p>
            </NavLink>
          </div>
          <div className="login-nav__right">
            <div className="login-nav__language-area">
              <button
                onClick={() => setLanguage("en")}
                className={
                  selectedLanguage === "en"
                    ? "login-nav__language-choice nav__language-choice--active"
                    : "login-nav__language-choice"
                }
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("ua")}
                className={
                  selectedLanguage === "ua"
                    ? "login-nav__language-choice nav__language-choice--active"
                    : "login-nav__language-choice"
                }
              >
                UA
              </button>
            </div>
            <button
              disabled={handleLoginButtonState()}
              className="primary-button"
              onClick={handleSignIn}
            >
              {t("sign-in")}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoginNav;
