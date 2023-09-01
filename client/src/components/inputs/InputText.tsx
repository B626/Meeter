import React from "react";

interface InputTextProps {
  title: string
  name: string,
  type: string,
  placeholder: string,
  register: Function,
  error: undefined | Object,
  errorMsg: string
}

const InputText = ({
  title,
  name,
  type,
  placeholder,
  register,
  error,
  errorMsg,
}:InputTextProps) => {
  return (
    <>
      <label className="auth-form__row">
        {title}
        <input
          name={name}
          type={type}
          id={name}
          placeholder={placeholder}
          {...register(name)}
        />
      </label>
      <p className="auth-form__error">{error && errorMsg}</p>
    </>
  );
};

export default InputText;
