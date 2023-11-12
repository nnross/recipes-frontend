/* eslint-disable no-unused-vars */
import React from 'react';
import propTypes from 'prop-types';

const ImageListItem = ({
  className, id, src, title, body, itemId,
}) => (
  <div className="mockItem">
    <img src={src} alt="icon" />
  </div>
);

ImageListItem.propTypes = {
  className: propTypes.string,
  id: propTypes.number,
  src: propTypes.string,
  title: propTypes.string,
  body: propTypes.string,
  itemId: propTypes.number,
};

ImageListItem.defaultProps = {
  className: 'imageListItem',
  id: 'imageListItem',
  src: null,
  title: null,
  body: null,
  itemId: null,
};

export default ImageListItem;
