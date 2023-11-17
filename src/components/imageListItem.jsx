/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import propTypes from 'prop-types';

const ImageListItem = ({
  className, id, src, title, body, itemId,
}) => {
  const [open, setOpen] = useState(false);
  const [left, setLeft] = useState(null);
  const [width, setWidth] = useState(null);

  const openInfo = (e, opening) => {
    if (opening) {
      const windowWidth = window.innerWidth;
      if (
        windowWidth >= 1300
        && windowWidth - (windowWidth / 4 - 15) < e.clientX + 30) setLeft('-100%');
      else if (
        windowWidth >= 800
        && windowWidth < 1300
        && windowWidth - (windowWidth / 3 - 15) < e.clientX + 30) setLeft('-100%');
      else if (
        windowWidth >= 600
        && windowWidth < 800
        && (windowWidth / 2 - 15) < e.clientX) setLeft('-100%');
      else if (windowWidth < 600) {
        setLeft('0');
        setWidth('100%');
      } else setLeft('100%');
      setOpen(true);
    } else {
      setOpen(false);
      setWidth('49%');
    }
  };
  return (
    <li
      className={className}
      id={id}
      style={open ? { flex: `0 0 ${width}` } : { flex: '0 0 47%' }}
    >
      <div
        className={`${className}__wrapper`}
        onClick={(e) => openInfo(e, true)}
        role="presentation"
        aria-label="iconBtn"
      >
        <img className={`${className}__wrapper__img`} src={src} alt="icon" />
      </div>
      <div
        className={`${className}__info`}
        id={`${id}__info`}
        style={open ? { display: 'grid', left } : { display: 'none' }}
      >
        <button
          type="button"
          className={`${className}__info__close`}
          onClick={(e) => openInfo(e, false)}
          aria-label="close"
        />
        <h3 className={`${className}__info__title`}>{title}</h3>
        <p className={`${className}__info__body`}>
          {body}
        </p>
        <a href={`/recipe/${itemId}`} className={`${className}__info__btnContainer`}>
          <button type="button" className={`${className}__info__btnContainer__btn`}> view full recipe </button>
        </a>
      </div>
    </li>
  );
};

ImageListItem.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
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
