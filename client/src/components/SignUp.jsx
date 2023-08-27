import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
  password_check: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .min(4)
    .max(20)
    .required(),
  gender_identity: yup.string(),
  show_gender: yup.boolean(),
});

const SignUp = ({ setSignUpPopup }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: null,
      password: null,
      password_check: null,
      gender_identity: null,
      show_gender: null,
    },
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  console.log(cookie, removeCookie);

  const handleSignUpPopup = () => {
    setSignUpPopup((prevState) => !prevState);
  };

  const submitFunc = async () => {
    const { email, password, password_check } = getValues();
    if (password === password_check) {
      setError(null);
      try {
        const response = await axios.post("http://localhost:9000/signup", {
          email,
          password,
        });
        setCookie("Email", response.data.email);
        setCookie("UserId", response.data.userId);
        setCookie("AuthToken", response.data.token);
        const success = response.status === 201;
        success
          && setError("Account created! You can log in now")
      } catch (err) {
        console.log(err);
      }
    } else {
      setError("Passwords don't match!");
    }
  };
  return (
    <div className="auth-popup">
      <h1 className="auth-popup__title"> Sign up </h1>
      <button className="auth-popup__close" onClick={handleSignUpPopup}>
        Close
      </button>
      <form className="auth-form" onSubmit={handleSubmit(submitFunc)}>
        <label className="auth-form__row">
          Email
          <input
            {...register("email")}
            name="email"
            type="email"
            id="email"
            placeholder="Your email"
          />
          <p>{errors.email?.message}</p>
        </label>
        <label className="auth-form__row">
          Password
          <input
            {...register("password")}
            type="password"
            id="password"
            name="password"
            placeholder="Create your password"
          />
          <p>{errors.password ? "Password must be at least 4 characters" : ""}</p>
        </label>
        <label className="auth-form__row">
          Confirm Password
          <input
            {...register("password_check")}
            type="password"
            id="password_check"
            name="password_check"
            placeholder="Confirm your password"
          />
          <p>{errors.password_check ? "Passwords need to match" : ""}</p>
        </label>
        <label className="auth-form__row auth-form-gender-radio">
          Gender
          <div className="auth-form__radio-inputs">
            <div className="auth-form__radio">
              <label htmlFor="man">Man</label>
              <input
                {...register("gender_identity")}
                type="radio"
                id="man"
                name="gender_identity"
                value="man"
              />
            </div>
            <div className="auth-form__radio">
              <label htmlFor="woman">Woman</label>
              <input
                {...register("gender_identity")}
                type="radio"
                id="woman"
                name="gender_identity"
                value="woman"
              />
            </div>
          </div>
        </label>
        <label className="auth-form__row auth-form-checkbox">
          Show my gender
          <input
            {...register("show_gender")}
            type="checkbox"
            id="showgender"
            name="show_gender"
          />
        </label>
        <button
          className="primary-button auth-popup__signup-button"
          type="submit"
        >
          Create account
        </button>
        <p className="auth-popup__error">{error}</p>
      </form>
    </div>
  );
};

SignUp.propTypes = {
  setSignUpPopup: PropTypes.func,
};

export default SignUp;
