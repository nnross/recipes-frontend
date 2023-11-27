import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders a single item in the recipeListItem format
 * @propery {String} className - custom className if wanted. Default is settingsInput
 * @propery {String} id - custom id if wanted. Default is settingsInput.
 * @propery {String} title - title of the input.
 * @propery {String} value - the value to be visible on the input.
 * @propery {function} onChange - onChange function to be used on the input.
 * @propery {Bool} disabled - if the input field is disabled or not.
 * @propery {String} placeholder - if instead of value wanted to use placeholder.
 * @returns List of items rendered.
 */
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
