import React from 'react';
import propTypes from 'prop-types';
import Calendar from '../../components/Calendar';
import Ingredients from '../../components/Ingredients';
import Instructions from '../../components/Instructions';

const Today = ({ className, id }) => (
  <div className={`${className}`}>
    <div className={`${className}__title`}>title</div>
    <div className={`${className}__background`}>background</div>
    <div className={`${className}__ingredients`}>ingredients</div>
    <div className={`${className}__instructions`}>instructions</div>
    <div className={`${className}__labels`}>labels</div>
    <div className={`${className}__original`}>original</div>
    <div className={`${className}__buttons`}>buttons</div>
    <div className={`${className}__date`}>date</div>
    <div className={`${className}__img`}>img</div>
  </div>

);

export default Today;

Today.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Today.defaultProps = {
  className: 'today',
  id: 'today',
};
