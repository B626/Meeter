import {useState} from "react";
import {useAppSelector} from "../redux/hooks";
import {getUser} from "../redux/slices";
import { useAuth } from "./useAuth";
import { useValidation } from "./useValidation";
import { onboardingSchema } from "../schemas/OnboardingSchema";
import axios from "axios";
import { useTranslation } from "react-i18next";

export const useOnboardingPage = () => {
  const [message, setMessage] = useState<string | null>(null);
  const { handleUser } = useAuth();
  const user = useAppSelector(getUser);
  const { t } = useTranslation();

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

  return {
    control,
    handleSubmit,
    submitFunc,
    register, 
    errors, 
    message, 
    user, 
    t
  }
}
