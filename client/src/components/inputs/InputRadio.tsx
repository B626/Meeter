import React from "react";

interface InputRadioProps {
  title: string
  name: string,
  values: String[],
  register: Function
}

const InputRadio = ({ title, name, values, register }: InputRadioProps) => {
  return (
    <label className="auth-form__row auth-form-gender-radio">
      {title}
      <div className="auth-form__radio-inputs">
        {values.map((e, i) => {
          return (
            <div key={i} className="auth-form__radio">
              <label htmlFor={e.toLowerCase()}>{e}</label>
              <input
                {...register(name)}
                type="radio"
                id={e.toLowerCase()}
                name={name}
                value={e.toLowerCase()}
              />
            </div>
          );
        })}
      </div>
    </label>
  );
};

export default InputRadio;
