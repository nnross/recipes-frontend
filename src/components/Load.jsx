import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders a loadin screen.
 * @property {String} className - custom className if wanted. Default is loading
 * @property {String} id - custom id if wanted. Default is loading
 * @returns the skeletonLoad
 */
const Load = ({ className, id }) => (
  <div className={className} id={id} />
);

Load.propTypes = {
  id: propTypes.string,
  className: propTypes.string,
};

Load.defaultProps = {
  id: 'loading',
  className: 'loading',
};

export default Load;
