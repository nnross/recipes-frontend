/* eslint-disable react/prop-types */
import React from 'react';

const RecipeListItem = ({
  className, id, title,
}) => (
  <div className={className} id={id}>
    <h3>{title}</h3>
  </div>
);
export default RecipeListItem;
