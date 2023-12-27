import React from 'react';
import propTypes from 'prop-types';
import ImageListItem from './ImageListItem';

/**
 * Renders a list of items with their image as the icon.
 * @property {String} className - Custom className if wanted. Default is imageList.
 * @property {String} id - Custom id if wanted. Default is imageList.
 * @property {List<JSON>} id - List of items to be rendered.
 * @returns list with images as icons.
 */
const ImageList = ({ className, id, items }) => {
  const itemList = [];

  items.map((item) => itemList.push(
    <ImageListItem
      src={item.image}
      title={item.title}
      body={item.body}
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

export default ImageList;

ImageList.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  items: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
};

ImageList.defaultProps = {
  className: 'imageList',
  id: 'imageList',
  items: null,
};
