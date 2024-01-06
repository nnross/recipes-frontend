/* eslint-disable import/prefer-default-export */
import recipeService from '../../services/recipeService';

/**
 * Adds recipe to database with selected action
 * @param {String} action - what action to be user, either toFavourite, toDoLater or toCalendar.
 * @param {Int} accountId - id of user.
 * @param {String} token - token of user.
 * @param {JSON} recipe - recipe to be added.
 * @param {String} toDoDate - date to be used if adding to calendar.
 * @param {Func} setLoading - function to set the loading state.
 * @param {Func} setSelected - function to set the selected button as selected.
 */
export const addToDb = (action, accountId, token, recipe, toDoDate, setLoading, setSelected) => {
  const measurementList = [];
  const instructionList = [];

  for (let i = 0; i < recipe.measurements.length; i += 1) {
    measurementList.push(
      {
        unit: { id: recipe.measurements[i].unit.id },
        ingredient: { id: recipe.measurements[i].name.id },
        amount: recipe.measurements[i].amount,
      },
    );
  }

  for (let i = 0; i < recipe.instructions.length; i += 1) {
    instructionList.push(
      {
        body: recipe.instructions[i],
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
    instructions: instructionList,
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
export const UseTag = (action, recipeId, date, token, setLoading, setSelected, current) => {
  if (action === 'favourite') {
    recipeService.putFavourite(recipeId, token)
      .then(() => {
        setLoading(0);
        setSelected(!current);
      })
      .catch(() => {
        setLoading(4);
        setTimeout(() => {
          setLoading(0);
        }, 1000);
      });
  } else if (action === 'doLater') {
    recipeService.putDoLater(recipeId, token)
      .then(() => {
        setLoading(0);
        setSelected(!current);
      })
      .catch(() => {
        setLoading(4);
        setTimeout(() => {
          setLoading(0);
        }, 1000);
      });
  } else {
    recipeService.putCalendar(recipeId, date, token)
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
  }
};
