import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {signInSchema} from "../schemas/SignInSchema";
import axios from "axios";
import InputText from "./inputs/InputText";
import {usePopUps} from "../hooks/usePopUps";
import {useAuth} from "../hooks/useAuth";
import {useValidation} from "../hooks/useValidation";

const SignIn = () => {
    const {errors, register, handleSubmit, getValues, control} = useValidation({schema: signInSchema})

    const [message, setMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    const {handleSignInPopup} = usePopUps();
    const {handleIsAuth, handleUser} = useAuth();

    const handleCloseSignInPopup = () => handleSignInPopup(false);

    const submitFunc = async () => {
        const {email, password} = getValues();
        setMessage(null);
        try {
            // todo response should have the response.data.user property;
            const response = await axios.post("http://localhost:9000/login", {
                email,
                password,
            }, {
                withCredentials: true
            });
            handleUser(response.data.user);
            handleIsAuth(true)
            handleCloseSignInPopup();

            navigate("/onboarding");
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
            control={control}
            placeholder={"Type your email"}
            register={register}
            error={errors?.email}
            errorMsg={"This is not an email"}
          />

          <InputText
            title={"Password"}
            name={"password"}
            type={"password"}
            control={control}
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
