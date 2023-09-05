import React, {useState} from "react";
import {useCookies} from "react-cookie";
import {signUpSchema} from "../schemas/SignUpSchema";
import axios from "axios";
import InputText from "./inputs/InputText";
import InputRadio from "./inputs/InputRadio";
import InputCheckbox from "./inputs/InputCheckbox";
import {usePopUps} from "../hooks/usePopUps";
import {useValidation} from "../hooks/useValidation";

const SignUp = () => {
    const {errors, register, handleSubmit, getValues} = useValidation({schema: signUpSchema})

    const {handleSignUpPopup} = usePopUps();

    const [message, setMessage] = useState<string | null>(null);

    const handleCloseSignUpPopup = () => handleSignUpPopup(false)

    const submitFunc = async () => {
        const {email, password, password_check} = getValues();
        if (password === password_check) {
            setMessage(null);
            try {
                await axios.post("http://localhost:9000/signup", {
                    email,
                    password,
                },{
                    withCredentials:true
                });
                setMessage("Account created! You can log in now");
            } catch (err) {
                console.log(err);
            }
        } else {
            setMessage("Passwords don't match!");
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
            value={""}
            placeholder={"Type your email"}
            register={register}
            error={errors.email}
            errorMsg={"This is not email"}
          />
          <InputText
            title={"Password"}
            name={"password"}
            type={"password"}
            value={""}
            placeholder={"Create your password"}
            register={register}
            error={errors.password}
            errorMsg={"Password must be at least 4 characters"}
          />
          <InputText
            title={"Confirm Password"}
            name={"password_check"}
            type={"password"}
            value={""}
            placeholder={"Confirm your password"}
            register={register}
            error={errors.password_check}
            errorMsg={"Password need to match"}
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
