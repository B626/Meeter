import React, { useEffect, useState } from "react";
import InputText from "../components/inputs/InputText";
import InputRadio from "../components/inputs/InputRadio";
import InputCheckbox from "../components/inputs/InputCheckbox";
import { useValidation } from "../hooks/useValidation";
import { onboardingSchema } from "../schemas/OnboardingSchema";
import axios from "axios";

const OnboardingPage = () => {
  const { errors, register, handleSubmit, getValues, control } = useValidation({
    schema: onboardingSchema,
  });
  
  const [userData, setUserData] = useState<Object | null>(null)

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      axios.get(
        "http://localhost:9000/user",
        {
          withCredentials: true,
        }
      ).then(res => {
         setUserData(res.data)
      })
    } catch (err) {
      console.log(err);
    }
  }, []);


  const submitFunc = async () => {

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
              value={null}
              placeholder={"Type your name"}
              register={register}
              error={errors.email}
              errorMsg={null}
            />
            <InputText
              title={"Email"}
              name={"email"}
              type={"email"}
              value={null}
              placeholder={"Type your email"}
              register={register}
              error={errors.email}
              errorMsg={"This is not email"}
            />
            <InputText
              title={"Password"}
              name={"password"}
              type={"password"}
              value={null}
              placeholder={"Create your password"}
              register={register}
              error={errors.password}
              errorMsg={"Password must be at least 4 characters"}
            />
            <div className="onboarding__row">
              <InputText
                title={"Day"}
                name={"dob_day"}
                type={"number"}
                value={null}
                placeholder={"Day of birth"}
                register={register}
                error={errors.password_check}
                errorMsg={""}
              />
              <InputText
                title={"Month"}
                name={"dob_month"}
                type={"number"}
                value={null}
                placeholder={"Month of birth"}
                register={register}
                error={errors.password_check}
                errorMsg={""}
              />
              <InputText
                title={"Year"}
                name={"dob_year"}
                type={"number"}
                value={null}
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
              value={null}
              placeholder={"Tell something about yourself"}
              register={register}
              error={errors.password}
              errorMsg={""}
            />
            <InputRadio
              title={"Gender"}
              name={"gender_identity"}
              values={["Man", "Woman"]}
              register={register}
            />
            <InputCheckbox
              title={"Show my gender"}
              name={"show_gender"}
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
