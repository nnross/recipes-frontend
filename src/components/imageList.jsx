import React from 'react';
import propTypes from 'prop-types';

const ImageList = ({ className, id, items }) => {
  const itemList = [];
  for (let i = 0; i < items.length; i += 1) {
    itemList.push(
      <div className="mockItem">
        {items[i].title}
      </div>,
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
