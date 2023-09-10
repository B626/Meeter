import React, { useState } from "react";
import InputText from "../components/inputs/InputText";
import InputRadio from "../components/inputs/InputRadio";
import InputCheckbox from "../components/inputs/InputCheckbox";
import { useValidation } from "../hooks/useValidation";
import { onboardingSchema } from "../schemas/OnboardingSchema";
import { useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/slices";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const OnboardingPage = () => {
  const [message, setMessage] = useState<string | null>(null);
  const user = useAppSelector(getUser);
  const { handleUser } = useAuth();

  const { errors, register, handleSubmit, getValues, control } = useValidation({
    schema: onboardingSchema,
    defaultValues: {
      first_name: user ? user.first_name : "",
      email: user ? user.email : "",
      dob_day: user ? user.dob_day : "",
      dob_month: user ? user.dob_month : "",
      dob_year: user ? user.dob_year : "",
      about: user ? user.about : "",
      gender_identity: user ? user.gender_identity : "",
      show_gender: user ? user.show_gender : "",
    },
  });

  const submitFunc = async () => {
    const {
      email,
      first_name,
      dob_day,
      dob_month,
      dob_year,
      about,
      gender_identity,
      show_gender,
    } = getValues();
    setMessage(null);
    try {
      await axios.put(
        "http://localhost:9000/updateuser",
        {
          first_name,
          email,
          dob_day,
          dob_month,
          dob_year,
          about,
          gender_identity,
          show_gender,
        },
        {
          withCredentials: true,
        }
      );
      handleUser({
        first_name,
        email,
        dob_day,
        dob_month,
        dob_year,
        about,
        gender_identity,
        show_gender,
      });
      setMessage("Profile updated");
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong");
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  };

  return (
    <div className="onboarding">
      <div className="container">
        <div className="create-profile">
          <h1 className="onboardюng__title">Create profile</h1>
          <form className="auth-form" onSubmit={handleSubmit(submitFunc)}>
            <InputText
              title={"Your name"}
              name={"first_name"}
              type={"text"}
              control={control}
              placeholder={"Type your name"}
              register={register}
              error={errors.first_name}
            />
            <InputText
              title={"Email"}
              name={"email"}
              type={"email"}
              control={control}
              placeholder={"Type your email"}
              register={register}
              error={errors.email}
            />
            <div className="onboarding__row">
              <InputText
                title={"Day"}
                name={"dob_day"}
                type={"number"}
                control={control}
                placeholder={"Day of birth"}
                register={register}
                error={errors.dob_day}
              />
              <InputText
                title={"Month"}
                name={"dob_month"}
                type={"number"}
                control={control}
                placeholder={"Month of birth"}
                register={register}
                error={errors.dob_month}
              />
              <InputText
                title={"Year"}
                name={"dob_year"}
                type={"number"}
                control={control}
                placeholder={"Year of birth"}
                register={register}
                error={errors.dob_year}
              />
            </div>
            <InputText
              title={"Bio"}
              name={"about"}
              type={"text"}
              control={control}
              placeholder={"Tell something about yourself"}
              register={register}
              error={errors.about}
            />
            <InputRadio
              title={"Gender"}
              name={"gender_identity"}
              control={control}
              values={["Man", "Woman"]}
              register={register}
            />
            <InputCheckbox
              title={"Show my gender"}
              name={"show_gender"}
              control={control}
              register={register}
            />
            <label className="auth-form__row auth-form-file">
              Avatar
              <input type="file" name="pic_url" id="pic_url" />
            </label>
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
    </div>
  );
};

export default OnboardingPage;
