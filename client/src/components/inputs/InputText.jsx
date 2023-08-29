import PropTypes from "prop-types";

const InputText = ({ title, name, type, placeholder, register, error, errorMsg }) => {
  return (
    <>
      <label className="auth-form__row">
        {title}
        <input
          name={name}
          type={type}
          id={name}
          placeholder={placeholder}
          {...register(name)}
        />
      </label>
      <p className="auth-form__error">{error && errorMsg}</p>
    </>
  );
};

InputText.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.func,
  error: PropTypes.object,
  errorMsg: PropTypes.string
};

export default InputText;
