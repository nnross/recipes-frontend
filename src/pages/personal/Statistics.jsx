import React from 'react';
import propTypes from 'prop-types';

const Statistics = ({ className, id }) => (
  <div className={className} />
);

export default Statistics;

Statistics.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Statistics.defaultProps = {
  className: 'statistics',
  id: 'statistics',
};
