import React from "react";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

import {usePopUps} from "../hooks/usePopUps";
import {useAuth} from "../hooks/useAuth";

const LoginPage = () => {
    const {handleSignInPopup, handleSignUpPopup, signUpPopup, signInPopup} = usePopUps();
    const {isAuth} = useAuth();

    return (
        <div className="login">
            <div className="container">
                <div className="login__inner">
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
                        {signUpPopup && (
                            <SignUp/>
                        )}
                        {signInPopup && (
                            <SignIn/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
