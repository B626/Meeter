import { useTranslation } from "react-i18next";
import { signUpSchema } from "../schemas/SignUpSchema";
import { useValidation } from "./useValidation";
import { usePopUps } from "./usePopUps";
import { useState } from "react";
import axios from "axios";

export const useSignUp = () => {
     const { errors, register, handleSubmit, getValues, control, reset } =
       useValidation({
         schema: signUpSchema,
       });

     const { t } = useTranslation();

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
           gender_interest: "",
         });
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
     return {
       t,
       handleCloseSignUpPopup,
       handleSubmit,
       submitFunc,
       control,
       register,
       errors,
       message,
     };
}