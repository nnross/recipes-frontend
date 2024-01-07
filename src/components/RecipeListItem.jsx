import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders a single item in the recipeListItem format
 * @propery {String} className - custom className if wanted. Default is recipeListItem
 * @propery {String} id - custom id if wanted. Default is recipeListItem.
 * @propery {String} title - title of the item.
 * @propery {number} itemId - id of the item.
 * @returns List of items rendered.
 */
const RecipeListItem = ({
  className, id, title, itemId,
}) => (
  <div className={className} id={id}>
    <h3 style={title.length > 37 ? { fontSize: '20px' } : {}}>{title}</h3>
    <a href={`/ownRecipe/${itemId}`} className={`${className}__link`}>
      <p href={`/ownRecipe/${itemId}`}> go to recipe </p>
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
