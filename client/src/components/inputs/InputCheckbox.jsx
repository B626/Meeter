import PropTypes from "prop-types";

const InputCheckbox = ({ title, name, register }) => {
  return (
    <label className="auth-form__row auth-form-checkbox">
      {title}
      <input type="checkbox" name={name} id={name} {...register(name)} />
    </label>
  );
};

InputCheckbox.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  register: PropTypes.func
};

export default InputCheckbox;
