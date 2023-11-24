import React from 'react';
import propTypes from 'prop-types';
import RecipeListItem from './RecipeListItem';

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
