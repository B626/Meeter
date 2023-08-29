import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required()
});
