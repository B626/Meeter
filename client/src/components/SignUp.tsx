import React from "react";
import InputText from "./inputs/InputText";
import InputRadio from "./inputs/InputRadio";
import { useSignUp } from "../hooks/useSignUp";

const SignUp = () => {
  const {
    t,
    handleCloseSignUpPopup,
    handleSubmit,
    submitFunc,
    control,
    register,
    errors,
    message,
  } = useSignUp();

  return (
    <div className="auth-popup__wrapper">
      <div className="auth-popup">
        <h1 className="auth-popup__title"> {t("sign-up-popup-title")} </h1>
        <button className="auth-popup__close" onClick={handleCloseSignUpPopup}>
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
          <InputText
            title={t("password-check")}
            name={"password_check"}
            type={"password"}
            control={control}
            placeholder={t("password-check-placeholder")}
            register={register}
            error={errors.password_check}
          />
          <InputRadio
            title={t("gender")}
            name={"gender_identity"}
            control={control}
            values={[
              { value: "Man", text: t("man") },
              { value: "Woman", text: t("woman") },
            ]}
            register={register}
          />
          <InputRadio
            title={t("gender-interest")}
            name={"gender_interest"}
            control={control}
            values={[
              { value: "Men", text: t("men") },
              { value: "Women", text: t("women") },
              { value: "Both", text: t("both") },
            ]}
            register={register}
          />
          <button
            className="primary-button auth-popup__signup-button"
            type="submit"
          >
            {t("create-account")}
          </button>
          <p className="auth-popup__error">{message}</p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
