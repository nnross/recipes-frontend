/* eslint-disable react/prop-types */
import React from 'react';

const ImageList = ({ className, id, items }) => {
  const itemList = [];

  items.map((item) => itemList.push(
    <div key={item.id}>
      {item.title}
      <br />
      {item.body}
      <br />
      {item.src}
      <br />
      {item.id}
    </div>,
  ));

  return (
    <ul className={className} id={id}>
      {itemList}
    </ul>
  );
};

export default ImageList;
