import * as yup from "yup";

export const onboardingSchema = yup.object().shape({
  first_name: yup.string().required(),
  email: yup.string().email().required(),
  dob_day: yup.number().min(1).max(31).integer().positive().required(),
  dob_month: yup.number().min(1).max(12).integer().positive().required(),
  dob_year: yup.number().min(1900).max(2013).integer().positive().required(),
  about: yup.string(),
  gender_identity: yup.string(),
  show_gender: yup.boolean(),
});
