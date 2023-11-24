import React from 'react';
import propTypes from 'prop-types';

const RecipeListItem = ({
  className, id, title, itemId,
}) => (
  <div className={className} id={id}>
    <h3>{title}</h3>
    <a href={`/recipe/${itemId}`} className={`${className}__link`}>
      <p> go to recipe </p>
      <div className={`${className}__link__arrow`} />
    </a>
  </div>
);
export default RecipeListItem;

RecipeListItem.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  itemId: propTypes.number,
  title: propTypes.string,
};

RecipeListItem.defaultProps = {
  className: 'recipeListItem',
  id: 'recipeListItem',
  itemId: null,
  title: null,
};
