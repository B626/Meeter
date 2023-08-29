import React from "react";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

import { useDispatch, useSelector } from "react-redux";
import { setSignInPopup, setSignUpPopup } from "../redux/slices/authSlice";

const LoginPage = () => {
  const {isAuth, signInPopup, signUpPopup} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSignInPopup = () => {
    dispatch(setSignInPopup((prevState) => !prevState));
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
