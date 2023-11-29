/* eslint-disable react/prop-types */
import React from 'react';

const RecipeList = ({ className, id, items }) => {
  const itemList = [];

  items.map((item) => itemList.push(
    <div key={item.id}>
      {item.title}
      {item.id}
    </div>,
  ));

  return (
    <ul className={className} id={id}>
      {itemList}
    </ul>
  );
};

export default RecipeList;
