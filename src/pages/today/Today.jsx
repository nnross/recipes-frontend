import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import Calendar from '../../components/Calendar';
import Ingredients from '../../components/Ingredients';
import Instructions from '../../components/Instructions';
import Label from '../../components/Label';
import recipeService from '../../services/recipeService';
import Load from '../../components/Load';
import Title from './Title';
import { UseTag } from '../recipe/recipeHooks';

/**
 * Renders today page.
 * @property {String} className - Custom class name if wanted, default today.
 * @property {String} id - Custom id if wanted, default today.
 * @returns today page
 */

const Today = ({ className, id }) => {
  const token = useOutletContext()[1];
  const path = window.location.pathname;
  const pathArray = path.split('/');
  const date = pathArray[2];
  const weekday = new Date(date).toLocaleDateString('en-us', { weekday: 'long' });
  const asDate = new Date(date).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' });

  const [loading, setLoading] = useState(1);
  const [recipe, setRecipe] = useState([]);
  const [src, setSrc] = useState('');
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState([]);
  const [source, setSource] = useState('');
  const [time, setTime] = useState(null);
  const [servings, setServings] = useState(null);
  const [health, setHealth] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [labels, setLabels] = useState([]);
  const [recipeId, setRecipeId] = useState(null);
  const [favourite, setFavourite] = useState(false);
  const [finished, setFinished] = useState(false);
  const [calendar, setCalendar] = useState(null);
  /**
   * Retrieves data for todays recipe
   */
  useEffect(() => {
    recipeService.getTodays(
      date,
      window.localStorage.getItem('accountId'),
      window.localStorage.getItem('token'),
    )
      .then((res) => {
        setRecipe(res.recipe);
        setCalendar(res.calendar);
        setSrc(res.recipe.image);
        setTitle(res.recipe.title);
        setInstructions(res.recipe.instructions);
        setSource(res.recipe.sourceUrl);
        setIngredients(res.recipe.measurements);
        setLabels(res.recipe.diets);
        setTime(res.recipe.readyInMinutes);
        setServings(res.recipe.servings);
        setHealth(res.recipe.healthScore);
        setRecipeId(res.recipe.id);
        setFavourite(res.recipe.favourite);
        setFinished(res.recipe.finished);
        setLoading(2);
      })
      .catch(() => {
        setLoading(3);
      });
  }, []);

  /**
   * Favourites and unfavourites the recipe.
   */
  const favouriteRecipe = () => {
    UseTag('favourite', recipeId, null, token, setLoading, setFavourite, favourite);
  };

  /**
   * Marks recipe as finished
   */
  const finishRecipe = () => {
    recipeService.putFinished(recipeId, token)
      .then(() => {
        setLoading(0);
        setFinished(true);
      })
      .catch(() => {
        setLoading(4);
        setTimeout(() => {
          setLoading(0);
        }, 1000);
      });
  };

  if (loading === 3) {
    return (
      <div>
        { calendar !== null ? (
          <div className={`${className}__calendar`}>
            <Calendar
              monday={calendar.Monday}
              tuesday={calendar.Tuesday}
              wednesday={calendar.Wednesday}
              thursday={calendar.Thursday}
              friday={calendar.Friday}
              saturday={calendar.Saturday}
              sunday={calendar.Sunday}
            />
          </div>
        ) : null }
        { recipe === null
          ? (
            <div className={`${className}__noRecipe`}>
              <h3> no recipe for this date yet </h3>
            </div>
          )
          : (
            <div className={`${className}__recipeError`}>
              <h3> an error occurred :( </h3>
            </div>
          )}
      </div>
    );
  }

  return (
    <div className={`${className}`} id={id}>
      { loading === 1
        ? (
          <div className={`${className}__title__load`}>
            <Load />
          </div>
        )
        : (
          <div className={`${className}__title`}>
            <Title title={title} time={time} servings={servings} health={health} />
          </div>
        )}
      { loading === 1
        ? (
          <div className={`${className}__load`}>
            <Load />
          </div>
        )
        : (
          <>
            <div className={`${className}__calendar`}>
              <Calendar
                monday={calendar.Monday}
                tuesday={calendar.Tuesday}
                wednesday={calendar.Wednesday}
                thursday={calendar.Thursday}
                friday={calendar.Friday}
                saturday={calendar.Saturday}
                sunday={calendar.Sunday}
              />
            </div>
            <div className={`${className}__background`} />
            <>
              <div className={`${className}__ingredients`}>
                <Ingredients ingredients={ingredients} />
              </div>
              <div className={`${className}__instructions`}>
                <Instructions instructions={instructions} loading={loading} />
              </div>
              <div className={`${className}__labels`}>
                <Label labels={labels} />
              </div>
              <div className={`${className}__original`}>
                <a className={`${className}__original__link`} href={source}>original recipe</a>
              </div>
              <div className={`${className}__buttons`}>
                {finished === false
                  ? <button className={`${className}__buttons__finished`} onClick={() => finishRecipe()} type="button">finished</button>
                  : <div />}
                {favourite === false
                  ? <button className={`${className}__buttons__favourite`} onClick={() => favouriteRecipe()} type="button" aria-label="favourite" />
                  : <button className={`${className}__buttons__remove`} onClick={() => favouriteRecipe()} type="button" aria-label="unfavourite" />}
              </div>
              { loading === 4
                ? (
                  <div className={`${className}__error`}>
                    <p>failed to add recipe</p>
                  </div>
                )
                : null }
              <div className={`${className}__date`}>
                <h3 className={`${className}__date__day`}>{weekday}</h3>
                <p className={`${className}__date__info`}>{asDate}</p>
              </div>
              <div className={`${className}__img`}>
                <img className={`${className}__img__1`} src={src} alt="icon" />
              </div>

            </>
          </>
        )}
    </div>
  );
};

export default Today;

Today.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Today.defaultProps = {
  className: 'today',
  id: 'today',
};
