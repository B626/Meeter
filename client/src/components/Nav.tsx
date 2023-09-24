import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { useValidation } from "../hooks/useValidation";
import { signInSchema } from "../schemas/SignInSchema";
import NavbarLink from "./NavbarLink";

const Nav = () => {
  const { errors, register, handleSubmit, getValues, control } = useValidation({
    schema: signInSchema,
  });
  const { handleIsAuth, handleUser } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    const { email, password } = getValues();
    try {
      await axios.post(
        "http://localhost:9000/logout",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      handleIsAuth(false);
      handleUser({});
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="nav login-nav">
      <div className="container">
        <div className="login-nav__inner">
          <div className="login-nav__left">
            <NavLink className="login-nav__logo" to="/main">
              Nav
            </NavLink>
            <ul className="menu">
              <li className="menu__item">
                <NavbarLink
                  activeClass={"menu__link menu__link--active"}
                  normalClass={"menu__link"}
                  to={"/onboarding"}
                  title={"Onboarding"}
                />
              </li>
              <li className="menu__item">
                <NavbarLink
                  activeClass={"menu__link menu__link--active"}
                  normalClass={"menu__link"}
                  to={"/dashboard"}
                  title={"Dashboard"}
                />
              </li>
              <li className="menu__item">
                <NavbarLink
                  activeClass={"menu__link menu__link--active"}
                  normalClass={"menu__link"}
                  to={"/chat"}
                  title={"Chat"}
                />
              </li>
            </ul>
          </div>
          <button className="primary-button" onClick={handleLogOut}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
