import React, { useEffect } from "react";
import { useController } from "react-hook-form";

interface InputTextProps {
  title: string
  name: string | any,
  type: string,
  control: any,
  valueData: any,
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
  valueData,
  placeholder,
  register,
  error,
  errorMsg,
}:InputTextProps) => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    control
  });

  const [value, setValue] = React.useState(field.value);

  useEffect(() => {
    valueData !== null &&  setValue(valueData)
  }, [])

  return (
    <>
      <label className="auth-form__row">
        {title}
          <input
            name={field.name}
            type={type}
            id={field.name}
            value={value}
            placeholder={placeholder}
            {...register(name)}
            onChange={(e) => {
                field.onChange(e.target.value, 10); 
                setValue(e.target.value);
              }
            }
            onBlur={field.onBlur}
          />
      </label>
      {/* <p className="auth-form__error">{error ? errorMsg : ''}</p> */}
    </>
  );
};

export default InputText;
