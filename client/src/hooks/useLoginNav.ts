import { useLocation, useNavigate } from "react-router-dom";
import { usePopUps } from "./usePopUps";
import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useLoginNav = () => {
  const { handleSignInPopup, handleSignUpPopup, signUpPopup, signInPopup } =
    usePopUps();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { handleIsAuth } = useAuth();
  const handleLoginButtonState = () =>
    !!((signUpPopup && pathname === "/") || signInPopup);
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "ua">("en")
  const {t, i18n} = useTranslation()
  useEffect(() => {
    selectedLanguage === "en" ? i18n.changeLanguage("en") : i18n.changeLanguage("ua")
  }, [])
  const handleSignIn = () => {
    handleIsAuth(true)
    handleSignInPopup(true);
    handleSignUpPopup(false);
    navigate("/");
  };
  const setLanguage = (lang:any) => {
    i18n.changeLanguage(lang)
    setSelectedLanguage(lang)
  }
  return {
    setLanguage,
    selectedLanguage,
    handleLoginButtonState,
    handleSignIn,
    t
  }
}