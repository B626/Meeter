import React from "react";
import PropTypes from "prop-types";

const InputText = ({
  title,
  name,
  type,
  placeholder,
  register,
  error,
  errorMsg,
}) => {
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
