import React from 'react';
import propTypes from 'prop-types';

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
