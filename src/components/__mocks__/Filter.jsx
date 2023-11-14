/* eslint-disable react/prop-types */
import React from 'react';

const Filter = ({
  className, id, filters, title, selectFilter,
}) => {
  const buttons = [];
  filters.map((item) => buttons.push(
    <button key={item} className={`${className}__filters__button`} onClick={() => { selectFilter(`${title}-${item}`); }} type="button">{item}</button>,
  ));

  return (
    <div className={className} id={id}>
      {title}
      <br />
      {buttons}
    </div>
  );
};

export default Filter;
