import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import axios from "axios";

const SignUp = ({ setSignUpPopup }) => {
  const {
    register,
    handleSubmit,
    watch,
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
  });
  console.log(watch, errors);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  console.log(cookies, removeCookie);

  const handleSignUpPopup = () => {
    setSignUpPopup((prevState) => !prevState);
  };

  const submitFunc = async () => {
    const {email, password, password_check} = getValues()
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
        success && setError("Account created! You can log in now");
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
            {...register("email", { required: true, minLength: 5 })}
            name="email"
            type="email"
            id="email"
            placeholder="Your email"
          />
        </label>
        <label className="auth-form__row">
          Password
          <input
            {...register("password", { required: true })}
            type="password"
            id="password"
            name="password"
            placeholder="Create your password"
          />
        </label>
        <label className="auth-form__row">
          Confirm Password
          <input
            {...register("password_check", { required: true })}
            type="password"
            id="password_check"
            name="password_check"
            placeholder="Confirm your password"
          />
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
