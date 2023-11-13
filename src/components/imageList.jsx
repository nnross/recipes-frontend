import React from 'react';
import propTypes from 'prop-types';
import ImageListItem from './ImageListItem';

const ImageList = ({ className, id, items }) => {
  const itemList = [];

  items.map((item) => itemList.push(
    <ImageListItem
      src={item.src}
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
