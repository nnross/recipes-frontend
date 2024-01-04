import React, { useState } from 'react';
import propTypes from 'prop-types';
import Filter from '../../components/Filter';

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
  className, id, resetFilters, selected, removeFilter, setFilter, windowWidth, searchResults,
}) => {
  const selectedFilters = [];
  const [open, setOpen] = useState(false);

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
      { windowWidth > 600 ? (null) : (
        <button
          className={`${className}__open`}
          type="button"
          onClick={() => setOpen(true)}
        >
          open filters
        </button>
      )}
      <div
        className={`${className}__selectors`}
        style={windowWidth > 600 || open ? { display: 'flex' } : { display: 'none' }}
      >
        { windowWidth > 600 ? (null) : (
          <button
            className={`${className}__selectors__close`}
            type="button"
            onClick={() => setOpen(false)}
          >
            close filters
          </button>
        )}
        <Filter title="sort" filters={['time asc', 'time desc', 'price asc', 'price desc', 'popularity asc', 'popularity desc']} selectFilter={setFilter} />
        <Filter title="ingredients" filters={['pork', 'chicken', 'beef', 'lamb', 'fish', 'tofu', 'beans', 'chickpeas', 'lentils', 'cheese', 'pasta', 'potato', 'rice']} selectFilter={setFilter} />
        <Filter title="cuisine" filters={['african', 'asian', 'american', 'british', 'chinese', 'indian', 'italian', 'japanese', 'korean', 'mexican']} selectFilter={setFilter} />
        <Filter title="diet" filters={['gluten free', 'vegetarian', 'vegan', 'pescetarian']} selectFilter={setFilter} />
        <Filter title="intolerances" filters={['dairy', 'egg', 'gluten', 'grain', 'peanut', 'seafood']} selectFilter={setFilter} />
        <Filter title="type" filters={['dessert', 'fingerfood', 'snack', 'appetizer', 'breakfast', 'main course']} selectFilter={setFilter} />
      </div>
      <div className={`${className}__selected`}>
        {selectedFilters}
      </div>
      <div className={`${className}__buttons`}>
        <button
          className={`${className}__buttons__apply`}
          onClick={(e) => searchResults(e)}
          type="button"
          style={selectedFilters.length > 0 ? { display: 'flex' } : { display: 'none' }}
        >
          apply
        </button>
        <button
          className={`${className}__buttons__reset`}
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
  windowWidth: propTypes.number,
  searchResults: propTypes.func,
};

Filters.defaultProps = {
  className: 'filters',
  id: 'filters',
  resetFilters: null,
  selected: [],
  removeFilter: null,
  setFilter: null,
  windowWidth: 0,
  searchResults: null,
};
