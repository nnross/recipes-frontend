import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';

/**
 * The filter component
 * @property {String} className - Custom className if wanted. Default is filter.
 * @property {String} id - Custom id if wanted. Default is filter.
 * @property {Array} filters - Array of filters.
 * @property {String} title - Title to the array of filters.
 * @property {Function} selectFilter - Returns the title and the filter item when clicked.
 * @returns Fitler
 */

const Filter = ({
  className, id, filters, title, selectFilter,
}) => {
  const [filter, setFilter] = useState(false);
  const buttons = [];
  const buttonRef = useRef(null);
  const filterRef = useRef(null);

  filters.map((item) => buttons.push(
    <button className={`${className}__filters__button`} onClick={() => selectFilter(`${title}-${item}`)} type="button" key={item}>{item}</button>,
  ));

  useEffect(() => {
    const checkFilters = (event) => {
      if (!buttonRef.current) return;

      const buttonSize = buttonRef.current.getBoundingClientRect();
      const filterSize = filterRef.current === null
        ? null
        : filterRef.current.getBoundingClientRect();

      // checks if click is inside filter.
      if (
        filterSize !== null && (
          event.clientX < buttonSize.x
          || (
            event.clientX > buttonSize.x + buttonSize.width
            && event.clientY < filterSize.y)
          || event.clientX > (filterSize.x + filterSize.width)
          || event.clientY < buttonSize.y
          || event.clientY > (filterSize.y + filterSize.height))) {
        setFilter(false);
      }
    };

    document.addEventListener('click', checkFilters);
  }, [buttonRef]);

  return (
    <div className={className} id={id} ref={buttonRef}>
      <button
        className={`${className}__open`}
        id={`${id}__open`}
        onClick={filter ? () => setFilter(false) : () => setFilter(true)}
        type="button"
        style={!filter && window.innerWidth > 600 ? {
          borderBottom: '1px solid #1C5253',
          borderBottomRightRadius: '5px',
          borderBottomLeftRadius: '5px',
          height: '33px',
        } : {
          borderBottom: '0px',
          borderBottomRightRadius: '0px',
          borderBottomLeftRadius: '0px',
          height: '40px',
        }}
      >
        {title}
      </button>
      <div className={`${className}__arrow`} style={filter ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }} />
      {filter ? (
        <div className={`${className}__filters`} id={`${id}__filters`} ref={filterRef}>
          {buttons}
        </div>
      ) : (null)}
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  filters: propTypes.arrayOf(propTypes.string),
  title: propTypes.string,
  selectFilter: propTypes.func,
};

Filter.defaultProps = {
  className: 'filter',
  id: 'filter',
  filters: [],
  title: null,
  selectFilter: null,
};
