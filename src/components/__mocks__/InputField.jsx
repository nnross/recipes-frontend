/* eslint-disable react/prop-types */
import React from 'react';

const InputField = ({
  className, id, placeholder, onSubmit, onChange, width, height, fontSize,
}) => (
  <div className={className} id={id} style={{ width, height }}>
    <form className={`${className}__form`} id={`${id}__form`} onSubmit={onSubmit}>
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
