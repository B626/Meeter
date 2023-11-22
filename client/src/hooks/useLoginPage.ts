import { useTranslation } from "react-i18next";
import { useAuth } from "./useAuth";
import { usePopUps } from "./usePopUps";

export const useLoginPage = () => {
   const {
      handleSignInPopup,
      handleSignUpPopup,
      signUpPopup,
      signInPopup,
   } = usePopUps();
   const { isAuth } = useAuth();
   const { t } = useTranslation();
   return {
     isAuth,
     t,
     handleSignInPopup,
     signInPopup,
     handleSignUpPopup,
     signUpPopup,
   };
}