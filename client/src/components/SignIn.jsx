import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useCookies } from "react-cookie";

const SignIn = ({ setSignInPopup, setIsAuth }) => {
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [formData, setFormData] = useState({
    user_id: "",
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    password: "",
    password_check: "",
    show_gender: null,
    gender_identity: "",
    gender_interest: "",
    email: "",
    url: "",
    about: "",
    matches: [],
  });
  console.log(cookies, removeCookie);
  let navigate = useNavigate();
  const handleSignInPopup = () => {
    setSignInPopup(false);
  };
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    const email = formData.email;
    const password = formData.password;
    e.preventDefault();
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
      <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
        <label className="auth-form__row">
          Email
          <input
            onChange={(e) => handleChange(e)}
            required
            name="email"
            type="email"
            value={formData.email}
            placeholder="Your email"
          />
        </label>
        <label className="auth-form__row">
          Password
          <input
            onChange={(e) => handleChange(e)}
            required
            name="password"
            type="password"
            value={formData.password}
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
