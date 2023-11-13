import React, { useState } from 'react';
import propTypes from 'prop-types';

// TODO add mobile page support

const Filter = ({
  className, id, filters, title, selectFilter,
}) => {
  const [filter, setFilter] = useState(null);
  const buttons = [];
  filters.map((item) => buttons.push(
    <button className={`${className}__filters__button`} onClick={() => { selectFilter(`${title}-${item}`); }} type="button">{item}</button>,
  ));
  const toggleFilter = () => {
    if (filter === null) {
      setFilter(
        <div className={`${className}__filters`} id={`${id}__filters`}>
          {buttons}
        </div>,
      );
    }
    if (filter != null) {
      setFilter(null);
    }
  };

  return (
    <div className={className} id={id}>
      <button
        className={`${className}__open`}
        id={`${id}__open`}
        onClick={toggleFilter}
        type="button"
        style={filter === null ? {
          borderBottom: '1px solid #1C5253',
          borderBottomRightRadius: '5px',
          borderBottomLeftRadius: '5px',
        } : {
          borderBottom: '0px',
          borderBottomRightRadius: '0px',
          borderBottomLeftRadius: '0px',
        }}
      >
        {title}
      </button>
      <div className={`${className}__arrow`} style={filter === null ? { transform: 'rotate(0deg)' } : { transform: 'rotate(180deg)' }} />
      {filter}
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
