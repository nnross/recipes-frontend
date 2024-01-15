import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useOutletContext, useNavigate } from 'react-router-dom';
import recipeService from '../../services/recipeService';
import Instructions from '../../components/Instructions';
import Ingredients from '../../components/Ingredients';
import Label from '../../components/Label';
import Load from '../../components/Load';
import RecipeButtons from './RecipeButtons';
import { UseTag, addToDb } from './recipeHooks';

/**
 * Renders the api recipe page.
 * @property {String} className - custom className if wanted. Default is recipe.
 * @property {String} id - custom id if wanted. Default is recipe
 * @returns recipe page.
 */
const Recipe = ({ className, id }) => {
  function getCurrentURL() {
    return window.location.href;
  }
  const url = getCurrentURL().split('/');
  const recipeId = Number(url[4]);

  const navigate = useNavigate();

  const token = useOutletContext()[1];
  const accountId = useOutletContext()[2];
  const loggedIn = useOutletContext()[3];

  const [loading, setLoading] = useState(1);
  const [src, setSrc] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [instructions, setInstructions] = useState([]);
  const [source, setSource] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [labels, setLabels] = useState([]);
  const [reminder, setReminder] = useState('');
  const [curLoad, setCurLoad] = useState('');
  const [favourite, setFavourite] = useState(false);
  const [later, setLater] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [isInDatabase, setIsInDatabase] = useState(false);
  const [recipe, setRecipe] = useState(null);

  /**
   * Retrieve the data for recipe.
   */
  useEffect(() => {
    recipeService.getRecipe(recipeId)
      .then((res) => {
        if (res === '') {
          navigate(`/ownRecipe/${recipeId}`);
          return;
        }
        setSrc(res.image);
        setTitle(res.title);
        setBody(res.summary);
        setInstructions(res.instructions);
        setSource(res.sourceUrl);
        setIngredients(res.measurements);
        setLabels(res.diets);
        setRecipe(res);
        setLoading(2);
      })
      .catch(() => {
        setLoading(4);
      });
  }, []);

  /**
   * Marks the recipe with correct tag, either favourite, do later or to calendar.
   * @param {String} action - desired action either favourite, do later or to calendar.
   * @param {Date} inputDate - for toCaledar the inputted date.
   */
  const tag = (action, inputDate) => {
    if (loggedIn === false) {
      setReminder(true);
      setTimeout(() => {
        setReminder(false);
      }, 3000);
      return;
    }

    setCurLoad(action);
    setLoading(2);

    if (isInDatabase) {
      if (action === 'favourite') UseTag(action, recipeId, null, token, setLoading, setFavourite, favourite);
      if (action === 'doLater') UseTag(action, recipeId, null, token, setLoading, setLater, later);
      if (action === 'toCalendar') UseTag(action, recipeId, inputDate, token, setLoading, setCalendar);
    } else {
      if (action === 'favourite') addToDb(action, accountId, token, recipe, null, setLoading, setFavourite);
      if (action === 'doLater') addToDb(action, accountId, token, recipe, null, setLoading, setLater);
      if (action === 'toCalendar') addToDb(action, accountId, token, recipe, inputDate, setLoading, setCalendar);
      setIsInDatabase(true);
    }
  };

  if (loading === 4) {
    return (
      <div className={`${className}`} id={`${id}`}>
        <div className={`${className}__background`}>
          error whilst loading
        </div>
      </div>
    );
  }
  return (
    <div className={`${className}`} id={`${id}`}>
      { loading === 1
        ? (
          <div className={`${className}__wrapper__load`}>
            <Load />
          </div>
        )
        : (
          <div className={`${className}__wrapper`}>
            <img className={`${className}__wrapper__img`} src={src} alt="icon" />
          </div>
        )}
      { loading === 1
        ? (
          <div className={`${className}__container`}>
            <div className={`${className}__container__load`}>
              <Load />
            </div>
          </div>
        )
        : (
          <div className={`${className}__container`}>
            <div className={`${className}__container__title`}>
              <h3 className={`${className}__container__title__text`}>
                {title}
              </h3>
            </div>
            <div className={`${className}__container__body`}>
              <p className={`${className}__container__body__text`}>
                {body}
              </p>
            </div>
            <div className={`${className}__container__stats`} />
            <div className={`${className}__container__instructions`}>
              <Instructions instructions={instructions} />
            </div>
            <div className={`${className}__container__labels`}>
              <Label labels={labels} />
            </div>
            <div className={`${className}__container__ingredients`}>
              <Ingredients ingredients={ingredients} />
            </div>
            <div className={`${className}__container__buttons`}>
              <RecipeButtons
                source={source}
                tag={tag}
                reminder={reminder}
                loading={loading}
                current={curLoad}
                favourite={favourite}
                later={later}
                calendar={calendar}
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default Recipe;

Recipe.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Recipe.defaultProps = {
  className: 'recipe',
  id: 'recipe',
};
