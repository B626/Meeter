import React from 'react';
import { useController } from "react-hook-form";

interface InputRadioProps {
  title: string
  name: string,
  control: any,
  values: String[],
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

  return (
    <label className="auth-form__row auth-form-gender-radio">
      {title}
      <div className="auth-form__radio-inputs">
        {values.map((e, i) => {
          const valueLoweredCase = e.toLowerCase();
          return (
            <div key={i} className="auth-form__radio">
              <label htmlFor={valueLoweredCase}>{e}</label>
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