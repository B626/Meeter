import React from "react";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

import PropTypes from "prop-types";

const LoginPage = ({
  isAuth,
  setIsAuth,
  signUpPopup,
  setSignUpPopup,
  signInPopup,
  setSignInPopup,
}) => {
  const handleSignInPopup = () => {
    setSignInPopup((prevState) => !prevState);
  };
  const handleSignUpPopup = () => {
    setSignUpPopup((prevState) => !prevState);
  };
  return (
    <div className="login">
      <div className="container">
        <div className="login__inner">
          <div className="login__body">
            <h1 className="login__title primary-h1">Find your match</h1>
            {isAuth ? (
              <button
                className="login__button primary-button"
                onClick={() => handleSignInPopup()}
              >
                Sign in
              </button>
            ) : (
              <button
                className="login__button primary-button"
                disabled={signInPopup ? true : false}
                onClick={() => handleSignUpPopup()}
              >
                Sign up
              </button>
            )}
            {signUpPopup && (
              <SignUp setSignUpPopup={setSignUpPopup} />
            )}
            {signInPopup && (
              <SignIn setSignInPopup={setSignInPopup} setIsAuth={setIsAuth} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  isAuth: PropTypes.bool,
  setIsAuth: PropTypes.func,
  signUpPopup: PropTypes.bool,
  setSignUpPopup: PropTypes.func,
  signInPopup: PropTypes.bool,
  setSignInPopup: PropTypes.func,
};

export default LoginPage;
