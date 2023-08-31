import React from "react";

interface InputCheckboxProps {
  title: string
  name: string,
  register: Function
}

const InputCheckbox = ({ title, name, register }: InputCheckboxProps) => {
  return (
    <label className="auth-form__row auth-form-checkbox">
      {title}
      <input type="checkbox" name={name} id={name} {...register(name)}/>
    </label>
  );
};

export default InputCheckbox;
