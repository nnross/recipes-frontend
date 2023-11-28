/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const Calendar = ({
  className,
  id,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
}) => {
  const dates = ['02-02-2022', '02-03-2022', '02-04-2022', '02-05-2022', '02-06-2022', '02-07-2022'];
  return (
    <div className={className} id={id}>
      <a className={`${className}__date`} type="button" href={`/today/${dates[0]}`}>
        <button type="button">
          M
          {monday}
        </button>
      </a>
      <a className={`${className}__date`} type="button" href={`/today/${dates[1]}`}>
        <button type="button">
          Tu
          {tuesday}
        </button>
      </a>
      <a className={`${className}__date`} type="button" href={`/today/${dates[2]}`}>
        <button type="button">
          W
          {wednesday}
        </button>
      </a>
      <a className={`${className}__date`} type="button" href={`/today/${dates[3]}`}>
        <button type="button">
          Th
          {thursday}
        </button>
      </a>
      <a className={`${className}__date`} type="button" href={`/today/${dates[4]}`}>
        <button type="button">
          F
          {friday}
        </button>
      </a>
      <a className={`${className}__date`} type="button" href={`/today/${dates[5]}`}>
        <button type="button">
          Sa
          {saturday}
        </button>
      </a>
      <a className={`${className}__date`} type="button" href={`/today/${dates[6]}`}>
        <button type="button">
          Su
          {sunday}
        </button>
      </a>
    </div>
  );
};

export default Calendar;
