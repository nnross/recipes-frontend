import React from 'react';
import propTypes from 'prop-types';

const Filters = ({
  className, id, resetFilters, selected, removeFilter,
}) => {
  const selectedFilters = [];

  selected.map((filter) => selectedFilters.push(
    <div className={`${className}__selected__item`}>
      {filter}
      <button
        className={`${className}__selected__item__remove`}
        type="button"
        onClick={() => removeFilter(filter)}
        aria-label="remove"
      />
    </div>,
  ));

  return (
    <div className={className} id={id}>
      <div className={`${className}__selectors`} />
      <div className={`${className}__selected`}>
        {selectedFilters}
      </div>
      <div className={`${className}__reset`}>
        <button className={`${className}__reset__button`} onClick={resetFilters} type="button"> reset </button>
      </div>
    </div>
  );
};

export default Filters;

Filters.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  resetFilters: propTypes.func,
  selected: propTypes.arrayOf(propTypes.string),
  removeFilter: propTypes.string,
};

Filters.defaultProps = {
  className: 'filters',
  id: 'filters',
  resetFilters: null,
  selected: [],
  removeFilter: null,
};
