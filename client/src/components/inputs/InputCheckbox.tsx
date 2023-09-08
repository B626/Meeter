import React, { useEffect } from "react";
import { useController } from "react-hook-form";

interface InputCheckboxProps {
  title: string
  name: string,
  control: any,
  valueData: any,
  register: Function
}

const InputCheckbox = ({
  title, 
  name, 
  control, 
  valueData, 
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

  const [value, setValue] = React.useState(field.value);

  useEffect(() => {
    valueData !== null && setValue(valueData)
  }, [])

  return (
    <label className="auth-form__row auth-form-checkbox">
      {title}
      <input type="checkbox" 
      name={field.name} 
      id={field.name} 
      checked={value}
      {...register(name)}
      onChange={(e) => {
          setValue((prevState:boolean) => !prevState)
          field.onChange(e.target.checked); 
        }
      }
      onBlur={field.onBlur}
      />
    </label>
  );
};

export default InputCheckbox;
