/* eslint-disable import/prefer-default-export */
import recipeService from '../../services/recipeService';

export const addToDb = (action, accountId, token, recipe, toDoDate, setLoading, setSelected) => {
  const measurementList = [];

  for (let i = 0; i < recipe.measurements.length; i += 1) {
    measurementList.push(
      {
        unit: { id: recipe.measurements[i].unit.id },
        ingredient: { id: recipe.measurements[i].name.id },
        amount: recipe.measurements[i].amount,
      },
    );
  }

  const payload = {
    id: recipe.id,
    title: recipe.title,
    description: recipe.summary,
    original: recipe.sourceUrl,
    time: recipe.readyInMinutes,
    servings: recipe.servings,
    image: recipe.image,
    favourite: action === 'favourite',
    doLater: action === 'doLater',
    finished: false,
    toDoDate: action === 'toCalendar' ? toDoDate : null,
    instructions: recipe.instructions,
    healthScore: recipe.healthScore,
    category: recipe.diets,
    type: recipe.dishTypes,
    country: recipe.cuisines,
    account: { id: accountId },
    measurements: measurementList,
  };

  recipeService.postRecipe(token, payload)
    .then(() => {
      setLoading(0);
      setSelected(true);
    })
    .catch(() => {
      setLoading(4);
      setTimeout(() => {
        setLoading(0);
      }, 1000);
    });
};
/**
 * Adds the wanted action to the selected recipe. Can either facourite, add to do later or
 * add to calendar.
 * @param {String} action - The action to be performed either favourite, doLater or toCalendar
 * @param {String} recipeId - id of recipe to be added
 * @param {String} accountId - id of account adding.
 * @param {String} date - if toCalender the date for what day.
 * @param {String} token - token of user.
 * @param {Function} setLoading - the set loading function.
 * @param {Function} setSelected - the setSelected function to set selected.
 */
export const UseTag = (action, recipeId, date, token, setLoading, setSelected) => {
  if (action === 'favourite') {
    recipeService.putFavourite(recipeId, token)
      .then(() => {
        setLoading(0);
        setSelected(true);
      })
      .catch(() => {
        setLoading(4);
        setTimeout(() => {
          setLoading(0);
        }, 1000);
      });
  } else if (action === 'doLater') {
    recipeService.putDolater(recipeId, token)
      .then(() => {
        setLoading(0);
        setSelected(true);
      })
      .catch(() => {
        setLoading(4);
        setTimeout(() => {
          setLoading(0);
        }, 1000);
      });
  } else if (action === 'toCalendar') {
    recipeService.putCalendar(recipeId, date, token)
      .then(() => {
        console.log(date);
        setLoading(0);
        setSelected(true);
      })
      .catch(() => {
        setLoading(4);
        setTimeout(() => {
          setLoading(0);
        }, 1000);
      });
  }
};
