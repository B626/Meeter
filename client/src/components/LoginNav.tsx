import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { usePopUps } from "../hooks/usePopUps";
import { useAuth } from "../hooks/useAuth";

const LoginNav = () => {
  const { handleSignInPopup, handleSignUpPopup, signUpPopup, signInPopup } =
    usePopUps();
  const { handleIsAuth, isAuth } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogOut = () => {
    handleIsAuth(false);
    navigate("/");
  };
  const handleLoginButtonState = () => {
    if ((signUpPopup && pathname === "/") || signInPopup) {
      return true;
    } else {
      return false;
    }
  };
  const handleSignIn = () => {
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
            {/* <ul className="menu">
              <li className="menu__item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "menu__link menu__link--active" : "menu__link"
                  }
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "menu__link menu__link--active" : "menu__link"
                  }
                  to="/learnmore"
                >
                  Learn more
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "menu__link menu__link--active" : "menu__link"
                  }
                  to="/safety"
                >
                  Safety
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "menu__link menu__link--active" : "menu__link"
                  }
                  to="/support"
                >
                  Support
                </NavLink>
              </li>
            </ul> */}
          </div>
          <div className="nav__right">
            <button className="nav__link">Language</button>
            {isAuth ? (
              <button
                disabled={signInPopup ? true : false}
                className="primary-button"
                onClick={handleLogOut}
              >
                Log out
              </button>
            ) : (
              <button
                disabled={handleLoginButtonState()}
                className="primary-button"
                onClick={handleSignIn}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoginNav;
