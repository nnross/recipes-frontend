/* eslint-disable import/prefer-default-export */
import recipeService from '../../services/recipeService';

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
export const UseTag = (action, recipeId, accountId, date, token, setLoading, setSelected) => {
  // todo preprocessing for actual call
  if (action === 'favourite') {
    recipeService.postFavourite(recipeId, accountId, token)
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
    recipeService.postDolater(recipeId, accountId, token)
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
    recipeService.postCalendar(recipeId, accountId, date, token)
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
