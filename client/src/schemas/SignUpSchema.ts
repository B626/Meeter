import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
  password_check: yup
    .string()
    .oneOf([yup.ref("password")])
    .required(),
  gender_identity: yup.string(),
  gender_interest: yup.string(),
  show_gender: yup.boolean(),
});
