import React from 'react';
import propTypes from 'prop-types';
import Filter from '../../components/filter';

/**
 * Renders the filters component for search page.
 * @property {String} className - Custom className if wanted. Default is filters.
 * @property {String} id - Custom id if wanted. Default is filters.
 * @property {Function} resetFilters - Function to be used when reset button is pressed.
 * @property {List<String>} selected - The selected filters. In format category-name
 * @property {Function} removeFilter - Function to be used when single filter is removed.
 * @property {Function} setFilter - Function to be used when filter is selected.
 * @returns Filters component for search page.
 */
const Filters = ({
  className, id, resetFilters, selected, removeFilter, setFilter,
}) => {
  const selectedFilters = [];

  selected.map((filter) => selectedFilters.push(
    <div className={`${className}__selected__item`} key={filter}>
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
      <div className={`${className}__selectors`}>
        <Filter title="sort" filters={['date ascending', 'date descending']} selectFilter={setFilter} />
        <Filter title="ingredients" filters={['beef', 'chicken', 'tofu']} selectFilter={setFilter} />
        <Filter title="cuisine" filters={['italian', 'asian']} selectFilter={setFilter} />
        <Filter title="diet" filters={['vegan', 'vegetarian', 'keto']} selectFilter={setFilter} />
        <Filter title="intolerances" filters={['dairy free', 'gluten free']} selectFilter={setFilter} />
        <Filter title="type" filters={['main', 'breakfast']} selectFilter={setFilter} />
      </div>
      <div className={`${className}__selected`}>
        {selectedFilters}
      </div>
      <div className={`${className}__reset`}>
        <button
          className={`${className}__reset__button`}
          onClick={resetFilters}
          type="button"
          style={selectedFilters.length > 0 ? { display: 'flex' } : { display: 'none' }}
        >
          reset
        </button>
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
  removeFilter: propTypes.func,
  setFilter: propTypes.func,
};

Filters.defaultProps = {
  className: 'filters',
  id: 'filters',
  resetFilters: null,
  selected: [],
  removeFilter: null,
  setFilter: null,
};
