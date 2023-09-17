import React, { useState } from "react";
import InputText from "../components/inputs/InputText";
import InputRadio from "../components/inputs/InputRadio";
import { useValidation } from "../hooks/useValidation";
import { onboardingSchema } from "../schemas/OnboardingSchema";
import { useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/slices";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const OnboardingPage = () => {
  const [message, setMessage] = useState<string | null>(null);
  const { handleUser } = useAuth();
  const user = useAppSelector(getUser);

  const { errors, register, handleSubmit, getValues, control } = useValidation({
    schema: onboardingSchema,
    defaultValues: {
      first_name: user ? user.first_name : "",
      last_name: user ? user.last_name : "",
      email: user ? user.email : "",
      dob_day: user ? user.dob_day : null,
      dob_month: user ? user.dob_month : null,
      dob_year: user ? user.dob_year : null,
      age: user ? user.age : null,
      about: user ? user.about : "",
      gender_identity: user ? user.gender_identity : "",
      gender_interest: user ? user.gender_interest : "",
      pic_url: user ? user.pic_url : "",
    },
  });

  const calculateAge = (dob_day:number, dob_month:number, dob_year: number) => {
   let now = new Date()
   let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
   let dob = new Date(dob_year, dob_month, dob_day)
   let age = today.getFullYear() - dob_year
   if (today < dob) {
      age = age-1
   }
   return age
  };

  const submitFunc = async () => {
    const {
      email,
      first_name,
      last_name,
      dob_day,
      dob_month,
      dob_year,
      about,
      gender_identity,
      gender_interest,
      pic_url
    } = getValues();
    setMessage(null);
    try {
      const actualAge = calculateAge(dob_day, dob_month, dob_year)
      await axios.put(
        "http://localhost:9000/updateuser",
        {
          first_name,
          last_name,
          email,
          dob_day,
          dob_month,
          dob_year,
          age: actualAge,
          about,
          gender_identity,
          gender_interest,
          pic_url,
          matches: user.matches
        },
        {
          withCredentials: true,
        }
      );
      handleUser({
        first_name,
        last_name,
        email,
        dob_day,
        dob_month,
        dob_year,
        age: actualAge,
        about,
        gender_identity,
        gender_interest,
        matches: user.matches
      });
      setMessage("Profile updated");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <section className="onboarding">
      <div className="container">
        <div className="onboarding__inner">
          <h1 className="onboarding__title">Create profile</h1>
          <form className="auth-form" onSubmit={handleSubmit(submitFunc)}>
            <InputText
              title={"Your first name"}
              name={"first_name"}
              type={"text"}
              control={control}
              placeholder={"Type your name"}
              register={register}
              error={errors.first_name}
            />
            <InputText
              title={"Your second name"}
              name={"last_name"}
              type={"text"}
              control={control}
              placeholder={"Type your second name"}
              register={register}
              error={errors.last_name}
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
            <InputText
              title={"Picture"}
              name={"pic_url"}
              type={"text"}
              control={control}
              placeholder={"Your picture url"}
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
