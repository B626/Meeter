import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import axios from "axios";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required()
});

const SignIn = ({ setSignInPopup, setIsAuth }) => {
  const [error, setError] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      email: null,
      password: null,
    },
    resolver: yupResolver(schema),
  });
  console.log(cookie, removeCookie)
  const navigate = useNavigate();
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
      setError('Wrong password or email')
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
            {...register("email")}
            name="email"
            type="email"
            placeholder="Your email"
          />
        </label>
        <label className="auth-form__row">
          Password
          <input
            {...register("password")}
            name="password"
            type="password"
            placeholder="Create your password"
          />
        </label>
        <button
          className="primary-button auth-popup__signup-button"
          type="submit"
        >
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
