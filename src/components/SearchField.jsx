import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders the search field component for the application
 * @property {String} className - custom className if wanted. Default is searchField.
 * @property {String} id - custom id if wanted. Default is searchField.
 * @property {String} placeholder - placeholder text for search field
 * @property {func} onSubmit - the onSubmit function to be used.
 * @property {func} onChange - the onChange to be used on the Search field.
 * @property {String} width - width of the component.
 * @property {String} height - height of the component.
 * @property {String} fontSize - font size for the search field.
 * @returns search field component.
 */
const SearchField = ({
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

export default SearchField;

SearchField.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  placeholder: propTypes.string,
  onSubmit: propTypes.func,
  onChange: propTypes.func,
  width: propTypes.string,
  height: propTypes.string,
  fontSize: propTypes.string,
};

SearchField.defaultProps = {
  className: 'searchField',
  id: 'searchField',
  placeholder: null,
  onSubmit: null,
  onChange: null,
  width: '500px',
  height: '60px',
  fontSize: '32px',
};
