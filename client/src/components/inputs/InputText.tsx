import React from "react";
import { useValidation } from "../../hooks/useValidation";
import { useFormController } from "../../hooks/useFormController";
import { Controller } from "react-hook-form";

interface InputTextProps {
  title: string
  name: string,
  type: string,
  value: null | string,
  placeholder: string,
  register: Function,
  error: null | Object | undefined,
  errorMsg: null | string
}

const InputText = ({
  title,
  name,
  type,
  value,
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
            value={value}
            placeholder={placeholder}
            {...register(name)}
          />
          {/* <Controller {...{control, register, name, rules:{}, render: () => <input
            name={name}
            type={type}
            id={name}
            value={value}
            placeholder={placeholder}
            {...register(name)}
          />}}/> */}
      </label>
      <p className="auth-form__error">{error && errorMsg}</p>
    </>
  );
};

export default InputText;
