import React from 'react';
import { useController } from "react-hook-form";

interface InputRadioProps {
  title: string
  name: string,
  control: any,
  values: Object[],
  register: Function
}

const InputRadio = ({
  title,
  name,
  control,
  values,
  register
}: InputRadioProps) => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    control
  });
  console.log(values)
  return (
    <label className="auth-form__row auth-form-gender-radio">
      {title}
      <div className="auth-form__radio-inputs">
        {values.map((e:any, i:any) => {
          const valueLoweredCase = e.value.toLowerCase();
          return (
            <div key={i} className="auth-form__radio">
              <label htmlFor={valueLoweredCase}>{e.text}</label>
              <input
                {...register(name)}
                {...field}
                onChange={() => field.onChange(valueLoweredCase)}
                type="radio"
                id={valueLoweredCase}
                checked={field.value === valueLoweredCase}
                value={valueLoweredCase}
              />
            </div>
          );
        })}
      </div>
    </label>
  );
};

export default InputRadio;