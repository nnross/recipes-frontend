import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders the instructions for a recipe
 * @property {String} className - custom className if wanted. Default is instructions.
 * @property {String} id - custom id if wanted. Default is instructions
 * @property {List<String>} instructions - the instructions to be displayed.
 * @returns instruction
 */
const Instructions = ({
  className, id, instructions,
}) => {
  const instructionList = [];
  instructions.map((instruction) => instructionList.push(
    <div className={`${className}__${instruction}`} id={`${id}__${instruction}`} key={(Math.random() * 1001)}>
      <li>
        {instruction}
      </li>
    </div>,
  ));
  return (
    <div className={`${className}__info`} id={`${id}__info`}>
      <h3 className={`${className}__info__title`}>
        Instructions
      </h3>
      <div className={`${className}__info__body`}>
        {instructionList}
      </div>
    </div>
  );
};

export default Instructions;

Instructions.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  instructions: propTypes.arrayOf(propTypes.string),
};

Instructions.defaultProps = {
  className: 'instructions',
  id: 'instructions',
  instructions: [],
};
