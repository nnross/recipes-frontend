/* eslint-disable react/prop-types */
import React from 'react';

const Statistics = ({
  className, id, doneCount, favouriteCount, doLaterCount, chart,
}) => {
  const list = [];
  chart.map((item) => list.push(
    <div key={item.name}>
      {item.name}
      {item.value}
    </div>,
  ));
  return (
    <div className={className} id={id}>
      <div className={`${className}__pieChart`}>
        <h3> Your favourite cuisines </h3>
        {list}
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
