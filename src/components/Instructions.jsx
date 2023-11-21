import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders the instructions for a recipe
 * @property {String} className - custom className if wanted. Default is instructions.
 * @property {String} id - custom id if wanted. Default is instructions
 * @property {String} instructions - the instructions to be displayed.
 * @returns instruction
 */
const Instructions = ({
  className, id, instructions,
}) => (
  <div className={`${className}__info`} id={`${id}__info`}>
    <h3 className={`${className}__info__title`}>
      Instructions
    </h3>
    <p className={`${className}__info__body`}>
      {instructions}
    </p>
  </div>
);

export default Instructions;

Instructions.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  instructions: propTypes.string,
};

Instructions.defaultProps = {
  className: 'instructions',
  id: 'instructions',
  instructions: '',
};
