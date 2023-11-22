import React from "react";
import InputText from "./inputs/InputText";
import { useSignIn } from "../hooks/useSignIn";

const SignIn = () => {
  const {
    t,
    handleCloseSignInPopup,
    handleSubmit,
    submitFunc,
    control,
    register,
    errors,
    message,
  } = useSignIn();
  
  return (
    <div className="auth-popup__wrapper">
      <div className="auth-popup">
        <h1 className="auth-popup__title">{t("sign-in-popup-title")}</h1>
        <button className="auth-popup__close" onClick={handleCloseSignInPopup}>
          {t("close-popup")}
        </button>
        <form className="auth-form" onSubmit={handleSubmit(submitFunc)}>
          <InputText
            title={t("email")}
            name={"email"}
            type={"email"}
            control={control}
            placeholder={t("email-placeholder")}
            register={register}
            error={errors.email}
          />

          <InputText
            title={t("password")}
            name={"password"}
            type={"password"}
            control={control}
            placeholder={t("password-placeholder")}
            register={register}
            error={errors.password}
          />
          <button
            className="primary-button auth-popup__signup-button"
            type="submit"
          >
            {t("sign-in")}
          </button>
          <p className="auth-popup__error">{message}</p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
