import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders a single item in the recipeListItem format
 * @property {String} className - custom className if wanted. Default is settingsInput
 * @property {String} id - custom id if wanted. Default is settingsInput.
 * @property {String} title - title of the input.
 * @property {String} value - the value to be visible on the input.
 * @property {function} onChange - onChange function to be used on the input.
 * @property {Bool} disabled - if the input field is disabled or not.
 * @property {String} placeholder - if instead of value wanted to use placeholder.
 * @property {Bool} password - if type password true.
 * @returns List of items rendered.
 */
const SettingsInput = ({
  className, id, title, value, onChange, disabled, placeholder, password,
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
      type={password ? 'password' : 'none'}
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
  password: propTypes.bool,
};

SettingsInput.defaultProps = {
  className: 'settingsInput',
  id: 'settingsInput',
  title: null,
  value: undefined,
  onChange: null,
  disabled: true,
  placeholder: undefined,
  password: false,
};
