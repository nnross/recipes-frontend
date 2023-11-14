/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const ImageListItem = ({
  className, id, src, title, body, itemId,
}) => (
  <li className="mockItem">
    {title}
    <br />
    {body}
    <br />
    {itemId}
    <br />
    {src}
  </li>
);

export default ImageListItem;
