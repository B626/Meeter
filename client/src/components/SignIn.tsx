import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../schemas/SignInSchema";
import { useDispatch } from "react-redux";
import { setIsAuth, setSignInPopup } from "../redux/slices/authSlice";
import axios from "axios";
import InputText from "./inputs/InputText";

const SignIn = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema)
  });
  const [message, setMessage] = useState<string | null>(null);
  const [cookie, setCookie, removeCookie] = useCookies<any>(["user"]);

  const navigate = useNavigate();
  const handleCloseSignInPopup = () => { 
    dispatch(setSignInPopup(false));
  };
  const submitFunc = async () => {
    const { email, password } = getValues();
    setMessage(null);
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
      dispatch(setIsAuth(true));
      dispatch(setSignInPopup(false));
    } catch (err) {
      console.log(err);
      setMessage("Wrong password or email");
    }
  };
  return (
    <div className="auth-popup">
      <h1 className="auth-popup__title">Sign in</h1>
      <button className="auth-popup__close" onClick={handleCloseSignInPopup}>
        Close
      </button>
      <form className="auth-form" onSubmit={handleSubmit(submitFunc)}>
        <InputText
          title={"Email"}
          name={"email"}
          type={"email"}
          placeholder={"Type your email"}
          register={register}
          error={errors?.email}
          errorMsg={"This is not an email"}
        />

        <InputText
          title={"Password"}
          name={"password"}
          type={"password"}
          placeholder={"Type your password"}
          register={register}
          error={errors.password}
          errorMsg={"Password must be at least 4 characters"}
        />
        <button
          className="primary-button auth-popup__signup-button"
          type="submit"
        >
          Sign in
        </button>
        <p className="auth-popup__error">{message}</p>
      </form>
    </div>
  );
};

export default SignIn;
