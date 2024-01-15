import React, { useState, useRef, useEffect } from 'react';
import propTypes from 'prop-types';

/**
 * Renders an image list item
 * @property {String} className - Custom class name if wanted, default imageListItem.
 * @property {String} id - Custom id if wanted, default imageListItem.
 * @property {String} src - Recipe's image's src, default null.
 * @property {String} title - Recipe's title, default null.
 * @property {Number} itemId - Id of the item, default null.
 * @returns image list item
 */
const ImageListItem = ({
  className, id, src, title, itemId,
}) => {
  const [open, setOpen] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const checkFilters = (event) => {
      if (!imageRef.current) return;

      const imageSize = imageRef.current.getBoundingClientRect();

      // checks if click is inside image.
      if (
        event.clientX < imageSize.x
        || event.clientX > (imageSize.x + imageSize.width)
        || event.clientY < imageSize.y
        || event.clientY > (imageSize.y + imageSize.height + 120)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', checkFilters);
  }, [imageRef]);

  return (
    <li
      className={`${className}${open ? '__open' : ''}`}
      id={id}
      ref={imageRef}
    >
      <div
        className={`${className}__wrapper`}
        onClick={() => setOpen(!open)}
        role="presentation"
        aria-label="iconBtn"
      >
        <img className={`${className}__wrapper__img`} src={src} alt="icon" />
      </div>
      <div
        className={`${className}__info`}
        id={`${id}__info`}
        style={open ? { display: 'grid' } : { display: 'none' }}
      >
        <button
          type="button"
          className={`${className}__info__close`}
          onClick={() => setOpen(!open)}
          aria-label="close"
        />
        <h3 className={`${className}__info__title`}>{title}</h3>
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
  itemId: propTypes.number,
};

ImageListItem.defaultProps = {
  className: 'imageListItem',
  id: 'imageListItem',
  src: null,
  title: null,
  itemId: null,
};

export default ImageListItem;
