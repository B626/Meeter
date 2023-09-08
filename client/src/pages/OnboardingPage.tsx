import React, { useEffect, useState } from "react";
import InputText from "../components/inputs/InputText";
import InputRadio from "../components/inputs/InputRadio";
import InputCheckbox from "../components/inputs/InputCheckbox";
import { useValidation } from "../hooks/useValidation";
import { onboardingSchema } from "../schemas/OnboardingSchema";
import axios from "axios";
import { useGetUser } from "../hooks/useGetUser";
import { useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/slices";

const OnboardingPage = () => {
  const [userData, setUserData] = useState<any>({});

  const [message, setMessage] = useState<string | null>(null);

  const { errors, register, handleSubmit, getValues, control } = useValidation({
    schema: onboardingSchema,
  });

  // Endless loading
  // const user = useGetUser()

  const user = useAppSelector(getUser);

  console.log(user.gender_identity)

  const submitFunc = async () => {
    console.log(getValues())
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
              valueData={user.first_name}
              placeholder={"Type your name"}
              register={register}
              error={errors.email}
              errorMsg={null}
            />
            <InputText
              title={"Email"}
              name={"email"}
              type={"email"}
              control={control}
              valueData={user.email}
              placeholder={"Type your email"}
              register={register}
              error={errors.email}
              errorMsg={"This is not email"}
            />
            <div className="onboarding__row">
              <InputText
                title={"Day"}
                name={"dob_day"}
                type={"number"}
                control={control}
                valueData={user.dob_day}
                placeholder={"Day of birth"}
                register={register}
                error={errors.dob_day}
                errorMsg={""}
              />
              <InputText
                title={"Month"}
                name={"dob_month"}
                type={"number"}
                control={control}
                valueData={user.dob_month}
                placeholder={"Month of birth"}
                register={register}
                error={errors.password_check}
                errorMsg={""}
              />
              <InputText
                title={"Year"}
                name={"dob_year"}
                type={"number"}
                control={control}
                valueData={user.dob_year}
                placeholder={"Year of birth"}
                register={register}
                error={errors.password_check}
                errorMsg={""}
              />
            </div>
            <InputText
              title={"Bio"}
              name={"about"}
              type={"text"}
              control={control}
              valueData={userData.about}
              placeholder={"Tell something about yourself"}
              register={register}
              error={errors.password}
              errorMsg={""}
            />
            <InputRadio
              title={"Gender"}
              name={"gender_identity"}
              control={control}
              valueData={user.gender_identity}
              values={["Man", "Woman"]}
              register={register}
            />
            <InputCheckbox
              title={"Show my gender"}
              name={"show_gender"}
              control={control}
              valueData={user.show_gender}
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
              Create profile
            </button>
            <p className="auth-popup__error">{message}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
