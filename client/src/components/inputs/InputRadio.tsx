import React, { useEffect } from "react";
import { useController } from "react-hook-form";

interface InputRadioProps {
  title: string
  name: string,
  control: any,
  valueData: any,
  values: String[],
  register: Function
}

const InputRadio = ({ 
  title, 
  name, 
  control, 
  valueData, 
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

  const [value, setValue] = React.useState(field.value);

  useEffect(() => {
    valueData !== null &&  setValue(valueData)
  }, [])

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
                onChange={(element) => {
                    field.onChange(element.target.id === "on" ? true : false)
                    setValue(element.target.id)
                  }
                }
                type="radio"
                id={e.toLowerCase()}
                name={field.name}
                checked={field.value === e.toLowerCase()}
              />
            </div>
          );
        })}
      </div>
    </label>
  );
};

export default InputRadio;
