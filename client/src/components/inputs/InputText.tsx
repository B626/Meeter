import React from "react";
import { useValidation } from "../../hooks/useValidation";
import { useFormController } from "../../hooks/useFormController";
import { Controller, useController } from "react-hook-form";

interface InputTextProps {
  title: string
  name: string,
  type: string,
  control: any,
  placeholder: string,
  register: Function,
  error: null | Object | undefined,
  errorMsg: null | string
}

const InputText = ({
  title,
  name,
  type,
  control,
  placeholder,
  register,
  error,
  errorMsg,
}:InputTextProps) => {
  console.log(error, errorMsg)
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  const [value, setValue] = React.useState(String(field.value));

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
            onChange={(e) => {
                field.onChange(parseInt(e.target.value, 10)); 
                setValue(e.target.value);
              }
            }
            onBlur={field.onBlur}
          />
      </label>
      <p className="auth-form__error">{error && errorMsg}</p>
    </>
  );
};

export default InputText;
