import React from 'react';
import propTypes from 'prop-types';
import RecipeListItem from './RecipeListItem';

/**
 * Renders a list of items in the recipeListItem format.
 * @propery {String} className - custom className if wanted. Default is recipeList
 * @propery {String} id - custom id if wanted. Default is recipeList.
 * @propery {List<JSON>} items - the list of items to be rendered.
 * @returns List of items rendered.
 */
const RecipeList = ({ className, id, items }) => {
  const itemList = [];

  items.map((item) => itemList.push(
    <RecipeListItem
      title={item.title}
      itemId={item.id}
      key={item.id}
    />,
  ));

  return (
    <ul className={className} id={id}>
      {itemList}
    </ul>
  );
};

export default RecipeList;

RecipeList.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  items: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
};

RecipeList.defaultProps = {
  className: 'recipeList',
  id: 'recipeList',
  items: null,
};
