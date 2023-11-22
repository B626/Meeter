import React from "react";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import LoginNav from "../components/LoginNav";
import Footer from "../components/Footer";

import { useLoginPage } from "../hooks/useLoginPage";

const LoginPage = () => {
    const {isAuth, t, handleSignInPopup, signInPopup, handleSignUpPopup, signUpPopup} = useLoginPage()
    return (
      <>
        <section className="login">
          <LoginNav />
          <div className="login__body">
            <h1 className="login__title primary-h1">{t("login-h1")}</h1>
            {isAuth ? (
              <button
                className="login__button primary-button"
                onClick={() => handleSignInPopup(true)}
              >
                {t("sign-in")}
              </button>
            ) : (
              <button
                className="login__button primary-button"
                disabled={!!signInPopup}
                onClick={() => handleSignUpPopup(true)}
              >
                {t("sign-up")}
              </button>
            )}
            {signUpPopup && <SignUp />}
            {signInPopup && <SignIn />}
          </div>
        </section>
        <Footer />
      </>
    );
};

export default LoginPage;
