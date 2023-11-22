import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { usePopUps } from "./usePopUps";
import { useAuth } from "./useAuth";
import { useValidation } from "./useValidation";
import { signInSchema } from "../schemas/SignInSchema";
import axios from "axios";

export const useSignIn = () => {
     const [message, setMessage] = useState<string | null>(null);
     const navigate = useNavigate();
     const { t } = useTranslation();
     const { handleSignInPopup } = usePopUps();
     const { handleIsAuth, handleUser } = useAuth();

     const { errors, register, handleSubmit, getValues, control, reset } =
       useValidation({
         schema: signInSchema,
       });

     const handleCloseSignInPopup = () => handleSignInPopup(false);

     const submitFunc = async () => {
       const { email, password } = getValues();
       console.log(email, password)
       setMessage(null);
       try {
         const response = await axios.post(
           "http://localhost:9000/login",
           {
             email,
             password,
           },
           {
             withCredentials: true,
           }
         );
         reset({
           email: "",
           password: "",
         });
         handleUser(response.data.user);
         handleIsAuth(true);
         handleCloseSignInPopup();
         navigate("/onboarding");
       } catch (err) {
         console.log(err);
         setMessage("Wrong password or email");
         setTimeout(() => {
           setMessage(null);
         }, 5000);
       }
     };
   return {
     t,
     handleCloseSignInPopup,
     handleSubmit,
     submitFunc,
     control,
     register,
     errors,
     message,
   };
}