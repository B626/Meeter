import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Nav = () => {
  const { handleIsAuth, isAuth } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    handleIsAuth(false);
    // todo add endpoint on the backend to clear cookie authToken
    navigate("/");
  };
  return (
    <div className="nav login-nav">
      <div className="container">
        <div className="login-nav__inner">
          <h1 className="login-nav__logo">Nav</h1>
          <button className="primary-button" onClick={handleLogOut}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
