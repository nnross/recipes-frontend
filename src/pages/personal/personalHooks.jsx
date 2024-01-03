/* eslint-disable import/prefer-default-export */
import recipeService from '../../services/recipeService';

/**
 * Calls the service to get either favourite or doLater recipes depending of the selected view.
 * @param {Integer} id - id of the account.
 * @param {String} token - token for the account login
 * @param {String} selection - selected view either favourite or doLater
 * @param {Integer} page - selected page
 * @param {Function} setItems - function to set the items.
 * @param {Function} setNextPage - function to set the data on the next page.
 * @param {Function} setLoading - function to set the loading state.
 */
export const UseGetItems = (id, token, selection, page, setItems, setNextPage, setLoading) => {
  if (selection === 'favourite') {
    recipeService.getFavourite(id, token, page)
      .then((res) => {
        setItems(res.recipes);
        setNextPage(res.nextPage);
        setLoading(0);
      })
      .catch(() => {
        setLoading(4);
      });
  } else {
    recipeService.getDoLater(id, token, page)
      .then((res) => {
        setItems(res.recipes);
        setNextPage(res.nextPage);
        setLoading(0);
      })
      .catch(() => {
        setLoading(4);
      });
  }
};
