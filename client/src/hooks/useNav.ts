import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/slices";
import { useValidation } from "./useValidation";
import { signInSchema } from "../schemas/SignInSchema";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useNav = () => {
    const {getValues} = useValidation({
    schema: signInSchema,
  });
  const user = useAppSelector(getUser)
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] =
    useState<any>(null);

  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng")
    i18n.changeLanguage(String(lang))
    setSelectedLanguage(lang)
  }, [])

  const { handleIsAuth, handleUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const navigate = useNavigate();
  const setLanguage = (lang:any) => {
    i18n.changeLanguage(lang)
    setSelectedLanguage(lang)
  }
  const handleLogOut = async () => {
    const { email, password } = getValues();
    try {
      await axios.post(
        "http://localhost:9000/logout",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      handleIsAuth(false);
      handleUser({});
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function isAdmin() {
      try{
        const response = await axios.get("http://localhost:9000/isadmin",{
          withCredentials:true
        });
        setIsAdmin(response.data)
      } catch(err) {
        console.log(err)
      }
    }
    isAdmin()
  }, [])
   return {
      user,isAdmin, t, setLanguage, selectedLanguage, handleLogOut
   }
}