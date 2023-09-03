import React from "react";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

import { usePopUps } from "../hooks/usePopUps";
import { useAuth } from "../hooks/useAuth";
import LoginNav from "../components/LoginNav";
import Footer from "../components/Footer";

const LoginPage = () => {
  const { handleSignInPopup, handleSignUpPopup, signUpPopup, signInPopup } =
    usePopUps();
  const { isAuth } = useAuth();

  return (
    <>
      <div className="login">
        <LoginNav />
        <div className="login__body">
          <h1 className="login__title primary-h1">Find your match</h1>
          {isAuth ? (
            <button
              className="login__button primary-button"
              onClick={() => handleSignInPopup(true)}
            >
              Sign in
            </button>
          ) : (
            <button
              className="login__button primary-button"
              disabled={!!signInPopup}
              onClick={() => handleSignUpPopup(true)}
            >
              Sign up
            </button>
          )}
          {signUpPopup && <SignUp />}
          {signInPopup && <SignIn />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
