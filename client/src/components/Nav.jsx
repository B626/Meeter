import React from "react";

import { NavLink, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const Nav = ({
  isAuth,
  setIsAuth,
  signInPopup,
  signUpPopup,
  setSignInPopup,
  setSignUpPopup,
}) => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    setIsAuth(false);
    navigate("/")
  };
  const handleSignIn = () => {
    setSignInPopup((prevState) => !prevState);
    setSignUpPopup(false);
  };
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav__inner">
          <div className="nav__left">
            <NavLink className="logo" to={"/"}>
              <p className="logo__text">Meeter</p>
            </NavLink>
            <ul className="menu">
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
            </ul>
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
                className="primary-button"
                disabled={signUpPopup ? true : signInPopup ? true : false}
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

Nav.propTypes = {
  isAuth: PropTypes.bool,
  setIsAuth: PropTypes.func,
  signInPopup: PropTypes.bool,
  signUpPopup: PropTypes.bool,
  setSignInPopup: PropTypes.func,
  setSignUpPopup: PropTypes.func,
};

export default Nav;
