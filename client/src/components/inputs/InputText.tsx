import React from 'react';
import { useController } from "react-hook-form";

interface InputTextProps {
  title: string
  name: string | any,
  type: string,
  control: any,
  placeholder: string,
  register: Function,
  error: any
}

const InputText = ({
  title,
  name,
  type,
  control,
  placeholder,
  register,
  error
}:InputTextProps) => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    control
  });

  return (
    <>
      <label className="auth-form__row">
        {title}
          <input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            {...field}
          />
      </label>
      <p className="auth-form__error">{error ? error.message : ""}</p>
    </>
  );
};

export default InputText;