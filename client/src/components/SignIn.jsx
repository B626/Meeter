import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

const SignIn = ({ setSignInPopup, setIsAuth }) => {
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
    } = useForm({
      defaultValues: {
        email: null,
        password: null
      },
    });
  console.log(cookies, removeCookie, errors);
  let navigate = useNavigate();
  const handleSignInPopup = () => {
    setSignInPopup(false);
  };
  const submitFunc = async () => {
    const { email, password } = getValues();
    setError(null);
    try {
      const response = await axios.post("http://localhost:9000/login", {
        email,
        password,
      });
      setCookie("Email", response.data.email);
      setCookie("UserId", response.data.userId);
      setCookie("AuthToken", response.data.token);
      const success = response.status === 201;
      if (success) navigate("/dashboard");
      setIsAuth(true);
      setSignInPopup(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="auth-popup">
      <h1 className="auth-popup__title">Sign in</h1>
      <button className="auth-popup__close" onClick={handleSignInPopup}>
        Close
      </button>
      <form className="auth-form" onSubmit={handleSubmit(submitFunc)}>
        <label className="auth-form__row">
          Email
          <input
            {...register("email", { required: true, minLength: 5 })}
            required
            name="email"
            type="email"
            placeholder="Your email"
          />
        </label>
        <label className="auth-form__row">
          Password
          <input
            {...register("password", { required: true })}
            required
            name="password"
            type="password"
            placeholder="Create your password"
          />
        </label>
        <button className="primary-button" type="submit">
          Sign in
        </button>
        <p className="auth-popup__error">{error}</p>
      </form>
    </div>
  );
};

SignIn.propTypes = {
  setSignInPopup: PropTypes.func,
  setIsAuth: PropTypes.func,
};

export default SignIn;
