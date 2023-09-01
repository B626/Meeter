import React from "react";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

import { setSignInPopup, setSignUpPopup } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const LoginPage = () => {
  const {isAuth, signInPopup, signUpPopup} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleSignInPopup = () => {
    dispatch(setSignInPopup(true));
  };
  const handleSignUpPopup = () => {
    dispatch(setSignUpPopup(true));
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
              <SignUp />
            )}
            {signInPopup && (
              <SignIn />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
