import React from 'react';
import propTypes from 'prop-types';

const Ingredients = ({
  className, id, ingredients,
}) => {
  const ingredientList = [];
  ingredients.map((ingredient) => ingredientList.push(
    <li className={`${className}__body__item`} key={ingredient.id}>
      <p>
        {ingredient.measures.metric.amount}
        {ingredient.measures.metric.unitShort}
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

Ingredients.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  ingredients: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
};

Ingredients.defaultProps = {
  className: 'ingredients',
  id: 'ingredients',
  ingredients: [],
};
