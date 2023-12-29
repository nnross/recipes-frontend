import React from 'react';
import propTypes from 'prop-types';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';

/**
 * renders the statistics component for the personal page.
 * @property {String} className - custom className if wanted. Default is statistics.
 * @property {number} doneCount - count of done recipes
 * @property {number} facouriteCount - count of favourited recipes
 * @property {number} doLaterCount - count of recipes with do later.
 * @property {List<JSON>} chart - data for piechart
 * @returns statistics component.
 */
const Statistics = ({
  className, id, doneCount, favouriteCount, doLaterCount, chart,
}) => {
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  return (
    <div className={className} id={id}>
      <div className={`${className}__pieChart`}>
        <h3> Your favourite cuisines </h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart className={`${className}__pieChart__container`}>
            <Pie data={chart} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="#8884d8" label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
              {chart.map((entry, index) => (
                <Cell key={`key-${entry}`} fill={colors[index]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className={`${className}__allTime`}>
        <div className={`${className}__allTime__done`}>
          <span>{doneCount}</span>
          finished recipes
        </div>
        <div className={`${className}__allTime__favourite`}>
          <span>{favouriteCount}</span>
          favourite recipes
        </div>
        <div className={`${className}__allTime__doLater`}>
          <span>{doLaterCount}</span>
          saved to do later
        </div>
      </div>
    </div>
  );
};

export default Statistics;

Statistics.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  doneCount: propTypes.number,
  favouriteCount: propTypes.number,
  doLaterCount: propTypes.number,
  chart: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
};

Statistics.defaultProps = {
  className: 'statistics',
  id: 'statistics',
  doneCount: 0,
  favouriteCount: 0,
  doLaterCount: 0,
  chart: null,
};
