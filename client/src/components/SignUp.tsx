import React, { useState } from "react";
import { signUpSchema } from "../schemas/SignUpSchema";
import axios from "axios";
import InputText from "./inputs/InputText";
import InputRadio from "./inputs/InputRadio";
import { usePopUps } from "../hooks/usePopUps";
import { useValidation } from "../hooks/useValidation";

const SignUp = () => {
  const { errors, register, handleSubmit, getValues, control, reset } = useValidation({
    schema: signUpSchema,
  });

  const { handleSignUpPopup } = usePopUps();

  const [message, setMessage] = useState<string | null>(null);

  const handleCloseSignUpPopup = () => handleSignUpPopup(false);

  const submitFunc = async () => {
    const { email, password, gender_identity, gender_interest } =
      getValues();
    setMessage(null);
    try {
      await axios.post(
        "http://localhost:9000/signup",
        {
          email,
          password,
          gender_identity,
          gender_interest,
        },
        {
          withCredentials: true,
        }
      );
      reset({
        email: "",
        password: "",
        password_check: "",
        gender_identity: "",
        gender_interest: ""
      })
      setMessage("Account created! You can log in now");
      setTimeout(() => {
        handleSignUpPopup(false);
        setMessage(null);
      }, 5000);
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="auth-popup">
      <h1 className="auth-popup__title"> Sign up </h1>
      <button className="auth-popup__close" onClick={handleCloseSignUpPopup}>
        Close
      </button>
      <form className="auth-form" onSubmit={handleSubmit(submitFunc)}>
        <InputText
          title={"Email"}
          name={"email"}
          type={"email"}
          control={control}
          placeholder={"Type your email"}
          register={register}
          error={errors.email}
        />
        <InputText
          title={"Password"}
          name={"password"}
          type={"password"}
          control={control}
          placeholder={"Create your password"}
          register={register}
          error={errors.password}
        />
        <InputText
          title={"Confirm Password"}
          name={"password_check"}
          type={"password"}
          control={control}
          placeholder={"Confirm your password"}
          register={register}
          error={errors.password_check}
        />
        <InputRadio
          title={"Gender"}
          name={"gender_identity"}
          control={control}
          values={["Man", "Woman"]}
          register={register}
        />
        <InputRadio
          title={"Gender interest"}
          name={"gender_interest"}
          control={control}
          values={["Man", "Woman", "Both"]}
          register={register}
        />
        <button
          className="primary-button auth-popup__signup-button"
          type="submit"
        >
          Create account
        </button>
        <p className="auth-popup__error">{message}</p>
      </form>
    </div>
  );
};

export default SignUp;
