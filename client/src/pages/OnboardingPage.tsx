import React from "react";
import InputText from "../components/inputs/InputText";
import InputRadio from "../components/inputs/InputRadio";
import { useOnboardingPage } from "../hooks/useOnboardingPage";

const OnboardingPage = () => {
  const { handleSubmit, submitFunc, control, register, errors, user, message, t } =
    useOnboardingPage();

  return (
    <section className="onboarding">
      <div className="container">
        <div className="onboarding__inner">
          <h1 className="onboarding__title">{t("create-account")}</h1>
          <form className="auth-form" onSubmit={handleSubmit(submitFunc)}>
            <InputText
              title={t("first-name")}
              name={"first_name"}
              type={"text"}
              control={control}
              placeholder={t("first-name-placeholder")}
              register={register}
              error={errors.first_name}
            />
            <InputText
              title={t("second-name")}
              name={"last_name"}
              type={"text"}
              control={control}
              placeholder={t("second-name-placeholder")}
              register={register}
              error={errors.last_name}
            />
            <InputText
              title={t("email")}
              name={"email"}
              type={"email"}
              control={control}
              placeholder={t("email-placeholder")}
              register={register}
              error={errors.email}
            />
            <div className="onboarding__row">
              <InputText
                title={t("day")}
                name={"dob_day"}
                type={"number"}
                control={control}
                placeholder={t("day-placeholder")}
                register={register}
                error={errors.dob_day}
              />
              <InputText
                title={t("month")}
                name={"dob_month"}
                type={"number"}
                control={control}
                placeholder={t("month-placeholder")}
                register={register}
                error={errors.dob_month}
              />
              <InputText
                title={t("year")}
                name={"dob_year"}
                type={"number"}
                control={control}
                placeholder={t("year-placeholder")}
                register={register}
                error={errors.dob_year}
              />
            </div>
            <InputText
              title={t("bio")}
              name={"about"}
              type={"text"}
              control={control}
              placeholder={t("bio-placeholder")}
              register={register}
              error={errors.about}
            />
            <InputText
              title={t("picture-url")}
              name={"pic_url"}
              type={"text"}
              control={control}
              placeholder={t("picture-url-placeholder")}
              register={register}
              error={errors.pic_url}
            />
            <div className="onboarding__profile-pic-wrapper">
              <img
                className="onboarding__profile-pic"
                src={user.pic_url}
                alt=""
              />
            </div>
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
                { value: "Man", text: t("man") },
                { value: "Woman", text: t("woman") },
                { value: "Both", text: t("both") },
              ]}
              register={register}
            />
            <button
              className="primary-button auth-popup__signup-button"
              type="submit"
            >
              Update profile
            </button>
            <p className="auth-popup__error">{message}</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OnboardingPage;
