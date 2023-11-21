import React, { useState } from 'react';
import propTypes from 'prop-types';
import Spinner from '../../components/Spinner';

/**
 * Displays the buttons for the recipe on its own page.
 * @property {String} className - custom className if wanted. Default is recipeButtons.
 * @property {String} id - custom id if wanted. Default is recipeButtons
 * @property {String} source - the source url of the item.
 * @property {Function} tag - the function to tag the recipe.
 * @property {Boolean} reminder - if reminder is visible or not. true if is false otherwise.
 * @property {Integer} loading - the state of loading.
 * @property {current} String - the currently selected filter. To set the loading state.
 * @property {Boolean} favourite - if recipe has been facourited. true if is false otherwise.
 * @property {Boolean} later - if recipe has been added to do later. true if is false otherwise.
 * @property {Boolean} calendar - if recipe has been calendar. true if is false otherwise.
 * @returns buttons for recipe page.
 */
const RecipeButtons = ({
  className, id, source, tag, reminder, loading, current, favourite, later, calendar,
}) => {
  const [date, setDate] = useState(false);
  return (
    <div className={`${className}`} id={id}>
      {reminder ? (
        <div className={`${className}__reminder`}>
          You need to be logged in to do this.
        </div>
      ) : (null)}
      <div className={`${className}__original`}>
        <a className={`${className}__original__link`} href={source}>original recipe</a>
      </div>
      <div className={`${className}__all`}>
        <form className={`${className}__all__date`} onSubmit={(e) => { e.preventDefault(); setDate(false); tag('toCalendar', e.target.elements[0].value); }}>
          {date
            ? (
              <div className={`${className}__all__date__buttons`}>
                <input className={`${className}__all__date__buttons__date`} id={`${id}__all__date__buttons__date`} type="date" aria-label="date" />
                <button className={`${className}__all__date__buttons__add`} type="submit">add</button>
                <button className={`${className}__all__date__buttons__cancel`} type="button" onClick={() => setDate(false)}>cancel</button>
              </div>
            )
            : (
              <div className={`${className}__all__calendar`}>
                <button className={`${className}__all__calendar__btn`} type="button" onClick={() => setDate(true)}>
                  {loading === 2 && current === 'toCalendar' ? (<Spinner />) : (<>add to calendar</>)}
                </button>
                <div
                  className={`${className}__all__calendar__img`}
                  id={`${id}__all__calendar__img`}
                  style={calendar ? { filter: 'invert(15%) sepia(59%) saturate(6731%) hue-rotate(356deg) brightness(97%) contrast(116%)' } : { filter: 'none' }}
                />
              </div>
            )}
        </form>
        <div className={`${className}__all__favourite`}>
          <button className={`${className}__all__favourite__btn`} onClick={() => tag('favourite', null)} type="button">
            {loading === 2 && current === 'favourite' ? (<Spinner />) : (<>favourite</>)}
          </button>
          <div
            className={`${className}__all__favourite__img`}
            id={`${id}__all__favourite__img`}
            style={favourite ? { filter: 'invert(15%) sepia(59%) saturate(6731%) hue-rotate(356deg) brightness(97%) contrast(116%)' } : { filter: 'none' }}
          />
        </div>
        <div className={`${className}__all__dolater`}>
          <button className={`${className}__all__dolater__btn`} onClick={() => tag('doLater', null)} type="button">
            {loading === 2 && current === 'doLater' ? (<Spinner />) : (<>add to do later</>)}
          </button>
          <div
            className={`${className}__all__dolater__img`}
            id={`${id}__all__dolater__img`}
            style={later ? { filter: 'invert(15%) sepia(59%) saturate(6731%) hue-rotate(356deg) brightness(97%) contrast(116%)' } : { filter: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeButtons;

RecipeButtons.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  recipeId: propTypes.number,
  source: propTypes.string,
  tag: propTypes.func,
  reminder: propTypes.string,
  loading: propTypes.number,
  current: propTypes.string,
  favourite: propTypes.bool,
  later: propTypes.bool,
  calendar: propTypes.bool,
};

RecipeButtons.defaultProps = {
  className: 'recipeButtons',
  id: 'recipeButtons',
  recipeId: [],
  source: '',
  tag: null,
  reminder: '',
  loading: 0,
  current: '',
  favourite: false,
  later: false,
  calendar: false,
};
