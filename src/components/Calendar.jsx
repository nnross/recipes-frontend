import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders the calender component
 * @property {String} classname - custom classname if wanted. Default is calendar.
 * @property {String} id - custom id if wanted. Default is calendar.
 * @property {JSON} monday - mondays state and date in JSON
 * @property {JSON} tuesday - tuesdays state and date in JSON
 * @property {JSON} wednesday - wednesdays state and date in JSON
 * @property {JSON} thursday - thursdays state and date in JSON
 * @property {JSON} friday - fridays state and date in JSON
 * @property {JSON} saturday - saturdays state and date in JSON
 * @property {JSON} sunday - sundays state and date in JSON
 * @returns calender
 */
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
}) => (
  <div className={className} id={id}>
    <a className={`${className}__date`} type="button" href={`/today/${monday.date}`}>
      <button className={`${className}__date__btn--${monday.state}`} type="button" aria-label="monday" />
      <p className={`${className}__date__label`}> M </p>
    </a>
    <a className={`${className}__date`} type="button" href={`/today/${tuesday.date}`}>
      <button className={`${className}__date__btn--${tuesday.state}`} type="button" aria-label="tuesday" />
      <p className={`${className}__date__label`}> Tu </p>
    </a>
    <a className={`${className}__date`} type="button" href={`/today/${wednesday.date}`}>
      <button className={`${className}__date__btn--${wednesday.state}`} type="button" aria-label="wednesday" />
      <p className={`${className}__date__label`}> W </p>
    </a>
    <a className={`${className}__date`} type="button" href={`/today/${thursday.date}`}>
      <button className={`${className}__date__btn--${thursday.state}`} type="button" aria-label="thursday" />
      <p className={`${className}__date__label`}> Th </p>
    </a>
    <a className={`${className}__date`} type="button" href={`/today/${friday.date}`}>
      <button className={`${className}__date__btn--${friday.state}`} type="button" aria-label="friday" />
      <p className={`${className}__date__label`}> F </p>
    </a>
    <a className={`${className}__date`} type="button" href={`/today/${saturday.date}`}>
      <button className={`${className}__date__btn--${saturday.state}`} type="button" aria-label="saturday" />
      <p className={`${className}__date__label`}> Sa </p>
    </a>
    <a className={`${className}__date`} type="button" href={`/today/${sunday.date}`}>
      <button className={`${className}__date__btn--${sunday.state}`} type="button" aria-label="sunday" />
      <p className={`${className}__date__label`}> Su </p>
    </a>
  </div>
);

export default Calendar;

Calendar.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  monday: propTypes.objectOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
  tuesday: propTypes.objectOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
  wednesday: propTypes.objectOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
  thursday: propTypes.objectOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
  friday: propTypes.objectOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
  saturday: propTypes.objectOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
  sunday: propTypes.objectOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
};

Calendar.defaultProps = {
  className: 'calendar',
  id: 'calendar',
  monday: { state: 0, date: null },
  tuesday: { state: 0, date: null },
  wednesday: { state: 0, date: null },
  thursday: { state: 0, date: null },
  friday: { state: 0, date: null },
  saturday: { state: 0, date: null },
  sunday: { state: 0, date: null },
};
