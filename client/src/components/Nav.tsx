import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { useValidation } from "../hooks/useValidation";
import { signInSchema } from "../schemas/SignInSchema";

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
      handleUser({})
      navigate("/");
    } catch (err) {
      console.log(err);
    }
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
