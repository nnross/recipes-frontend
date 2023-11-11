import React from 'react';
import propTypes from 'prop-types';
import ImageListItem from './ImageListItem';

const ImageList = ({ className, id, items }) => {
  const itemList = [];
  for (let i = 0; i < items.length; i += 1) {
    itemList.push(
      <ImageListItem
        src={items[i].src}
        title={items[i].title}
        body={items[i].body}
        id={items[i].id}
        key={items[i].id}
      />,
    );
  }
  return (
    <div className={className} id={id}>
      {itemList}
    </div>
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
