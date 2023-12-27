import React from 'react';
import propTypes from 'prop-types';
/**
 * Renders the labels for recipes.
 * @property {String} className - custom className if wanted. Default is label.
 * @property {String} id - custom id if wanted. Default is label
 * @property {List<JSON>} label - the labels to be rendered.
 * @returns labels.
 */
const Label = ({ className, id, labels }) => {
  const labelList = [];

  labels.map((label) => labelList.push(
    <div className={`${className}__${label}`} id={`${id}__${label}`} key={label} />,
  ));
  return (
    <div className={`${className}`} id={`${id}`}>
      {labelList}
    </div>
  );
};

export default Label;

Label.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  labels: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
};

Label.defaultProps = {
  className: 'label',
  id: 'label',
  labels: [],
};
