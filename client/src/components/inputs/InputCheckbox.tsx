import React from 'react';
import { useController } from "react-hook-form";

interface InputCheckboxProps {
  title: string
  name: string,
  control: any,
  register: Function
}

const InputCheckbox = ({
  title,
  name,
  control,
  register
}: InputCheckboxProps) => {
    const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    control
  });

  return (
    <label className="auth-form__row auth-form-checkbox">
      {title}
      <input type="checkbox"
      checked={field.value}
      {...register(name)}
       {...field}
      />
    </label>
  );
};

export default InputCheckbox;