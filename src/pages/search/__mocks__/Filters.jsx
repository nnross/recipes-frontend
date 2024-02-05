/* eslint-disable react/prop-types */
import React from 'react';

const Filters = ({
  className, id, resetFilters, selected, removeFilter, setFilter,
}) => {
  const selectedFilters = [];
  selected.map((filter) => selectedFilters.push(
    <div className={`${className}__selected__item`} key={`${filter}`}>
      {filter.split('-')[1]}
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
      <div className={`${className}__button`}>
        <button onClick={() => setFilter('test-addition')} type="button"> add </button>
      </div>
      <div className={`${className}__selectors`}>
        <button onClick={() => setFilter('test-addition')} type="button"> add </button>
      </div>
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
