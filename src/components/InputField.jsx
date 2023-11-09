import React from 'react';
import propTypes from 'prop-types';

const InputField = ({
  className, id, placeholder, onSubmit, onChange, width, height, fontSize,
}) => (
  <div className={className} id={id} style={{ width, height }}>
    <form className={`${className}__form`} id={`${id}__form__form`} onSubmit={onSubmit}>
      <input
        className={`${className}__form__input`}
        id={`${id}__form__input`}
        placeholder={placeholder}
        onChange={onChange}
        style={{ fontSize }}
      />
      <button className={`${className}__form__search`} id={`${id}__form__search`} type="submit" value="" style={{ width: height }} aria-label="Search" />
    </form>
  </div>
);

export default InputField;

InputField.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  placeholder: propTypes.string,
  onSubmit: propTypes.func,
  onChange: propTypes.func,
  width: propTypes.string,
  height: propTypes.string,
  fontSize: propTypes.string,
};

InputField.defaultProps = {
  className: 'inputField',
  id: 'inputField',
  placeholder: null,
  onSubmit: null,
  onChange: null,
  width: '500px',
  height: '60px',
  fontSize: '32px',
};
