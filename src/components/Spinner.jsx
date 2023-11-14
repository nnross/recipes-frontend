import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders a spinner loading icon.
 * @property {String} className - Custom className if wanted. Default is spinner.
 * @property {String} id - Custom id if wanted. Default is spinner.
 * @returns Spinner loader.
 */
const Spinner = ({ className, id }) => (
  <div className={className} id={id}> loading </div>
);

export default Spinner;

Spinner.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Spinner.defaultProps = {
  className: 'spinner',
  id: 'spinner',
};
