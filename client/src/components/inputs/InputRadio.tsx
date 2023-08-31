import React from "react";
import PropTypes from "prop-types";

const InputRadio = ({ title, name, values, register }) => {
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
