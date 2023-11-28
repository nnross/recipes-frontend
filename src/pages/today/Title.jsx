import React from 'react';
import propTypes from 'prop-types';

const Title = ({
  className, id, title, time, servings, health,
}) => (
  <div className={`${className}`} id={`${id}`}>
    <h3 className={`${className}__name`}>{title}</h3>
    <div className={`${className}__info`}>
      <p className={`${className}__info__time`}>
        {time}
        {' '}
        min
      </p>
      <p className={`${className}__info__servings`}>
        {servings}
        {' '}
        servings
      </p>
      <p className={`${className}__info__health`}>
        {health}
        {' '}
        health score
      </p>
    </div>
  </div>
);

export default Title;

Title.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  title: propTypes.string,
  time: propTypes.number,
  servings: propTypes.number,
  health: propTypes.number,
};

Title.defaultProps = {
  className: 'title',
  id: 'title',
  title: '',
  time: 0,
  servings: 0,
  health: 0,
};
