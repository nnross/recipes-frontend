import React from 'react';
import propTypes from 'prop-types';
import { getWeekDates } from '../helpers/dateHelpers';

/**
 * Renders the calender component
 * @property {String} classname - custom classname if wanted. Default is calendar.
 * @property {String} id - custom id if wanted. Default is calendar.
 * @property {Number} monday - state of monday. 0 is no recipe, 1 is recipe, two is done
 * @property {Number} tuesday - state of tuesday. 0 is no recipe, 1 is recipe, two is done
 * @property {Number} wednesday - state of wednesday. 0 is no recipe, 1 is recipe, two is done
 * @property {Number} thursday - state of thursday. 0 is no recipe, 1 is recipe, two is done
 * @property {Number} friday - state of friday. 0 is no recipe, 1 is recipe, two is done
 * @property {Number} saturday - state of saturday. 0 is no recipe, 1 is recipe, two is done
 * @property {Number} sunday - state of sunday. 0 is no recipe, 1 is recipe, two is done
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
}) => {
  const dates = getWeekDates();
  return (
    <div className={className} id={id}>
      <a className={`${className}__date`} type="button" href={`/today/${dates[0]}`}>
        <button className={`${className}__date__btn--${monday}`} type="button" aria-label="monday" />
        <p className={`${className}__date__label`}> M </p>
      </a>
      <a className={`${className}__date`} type="button" href={`/today/${dates[1]}`}>
        <button className={`${className}__date__btn--${tuesday}`} type="button" aria-label="tuesday" />
        <p className={`${className}__date__label`}> Tu </p>
      </a>
      <a className={`${className}__date`} type="button" href={`/today/${dates[2]}`}>
        <button className={`${className}__date__btn--${wednesday}`} type="button" aria-label="wednesday" />
        <p className={`${className}__date__label`}> W </p>
      </a>
      <a className={`${className}__date`} type="button" href={`/today/${dates[3]}`}>
        <button className={`${className}__date__btn--${thursday}`} type="button" aria-label="thursday" />
        <p className={`${className}__date__label`}> Th </p>
      </a>
      <a className={`${className}__date`} type="button" href={`/today/${dates[4]}`}>
        <button className={`${className}__date__btn--${friday}`} type="button" aria-label="friday" />
        <p className={`${className}__date__label`}> F </p>
      </a>
      <a className={`${className}__date`} type="button" href={`/today/${dates[5]}`}>
        <button className={`${className}__date__btn--${saturday}`} type="button" aria-label="saturday" />
        <p className={`${className}__date__label`}> Sa </p>
      </a>
      <a className={`${className}__date`} type="button" href={`/today/${dates[6]}`}>
        <button className={`${className}__date__btn--${sunday}`} type="button" aria-label="sunday" />
        <p className={`${className}__date__label`}> Su </p>
      </a>
    </div>
  );
};

export default Calendar;

Calendar.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  monday: propTypes.number,
  tuesday: propTypes.number,
  wednesday: propTypes.number,
  thursday: propTypes.number,
  friday: propTypes.number,
  saturday: propTypes.number,
  sunday: propTypes.number,
};

Calendar.defaultProps = {
  className: 'calendar',
  id: 'calendar',
  monday: 0,
  tuesday: 0,
  wednesday: 0,
  thursday: 0,
  friday: 0,
  saturday: 0,
  sunday: 0,
};
