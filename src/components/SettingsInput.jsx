import React from 'react';
import propTypes from 'prop-types';

const SettingsInput = ({
  className, id, title, value, onChange, disabled, placeholder,
}) => (
  <div className={className} id={id}>
    <p className={`${className}__title`}>
      {title}
    </p>
    <input
      className={`${className}__input`}
      disabled={disabled}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      type={title === 'password' ? 'password' : 'none'}
    />
  </div>
);

export default SettingsInput;

SettingsInput.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  title: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
  disabled: propTypes.bool,
  placeholder: propTypes.string,
};

SettingsInput.defaultProps = {
  className: 'settingsInput',
  id: 'settingsInput',
  title: null,
  value: undefined,
  onChange: null,
  disabled: true,
  placeholder: undefined,
};
