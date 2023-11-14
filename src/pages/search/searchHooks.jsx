/* eslint-disable import/prefer-default-export */
import searchService from '../../services/searchService';

/**
 * Hook to get recipe results based on searched.
 * @param {String} id - id of the user trying to get recipes.
 * @param {String} token  - token of the user trying to get recipes.
 * @param {String} search - search used for query.
 * @param {String} filters - filters used for query.
 * @param {String} page - page selected for query.
 * @param {Function} setItems - function to set the recieved items.
 * @param {Function} setMoreItems - function to set the status of more results.
 * @param {Function} setLoading - function to set the loading state.
 */
export const UseSearch = (id, token, search, filters, page, setItems, setMoreItems, setLoading) => {
  // TODO: preprocessing for actual call
  searchService.getSearch(id, token, search, filters, page)
    .then((res) => {
      setItems(res.items);
      setMoreItems(res.moreItems);
      setLoading(0);
    })
    .catch(() => {
      setLoading(4);
    });
};
