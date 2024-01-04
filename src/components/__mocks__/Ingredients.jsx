/* eslint-disable react/prop-types */
import React from 'react';

const Ingredients = ({
  className, id, ingredients,
}) => {
  const ingredientList = [];
  ingredients.map((ingredient) => ingredientList.push(
    <li className={`${className}__body__item`} key={ingredient.id}>
      <p>
        {ingredient.amount}
        {ingredient.unit}
        {ingredient.name}
      </p>
    </li>,
  ));
  return (
    <div className={`${className}`} id={`${id}`}>
      <h3 className={`${className}__title`}>
        Ingredients
      </h3>
      <ul className={`${className}__body`}>
        {ingredientList}
      </ul>
    </div>
  );
};

export default Ingredients;
