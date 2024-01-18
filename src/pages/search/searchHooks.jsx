/* eslint-disable import/prefer-default-export */
import searchService from '../../services/searchService';

/**
 * Hook to get recipe results based on searched.
 * @param {String} id - id of the user trying to get recipes.
 * @param {String} token  - token of the user trying to get recipes.
 * @param {String} search - search used for query.
 * @param {List<String>} filters - filters used for query.
 * @param {Integer} page - page selected for query.
 * @param {Function} setItems - function to set the recieved items.
 * @param {Function} setMoreItems - function to set the status of more results.
 * @param {Function} setLoading - function to set the loading state.
 */
export const UseSearch = (id, token, search, filters, page, setItems, setMoreItems, setLoading) => {
  const ingredients = [];
  const cuisine = [];
  const diet = [];
  const intolerances = [];
  let type = '';
  let sort = [];
  let sortType = '';
  let direction = '';

  filters.forEach((filter) => {
    if (filter.includes('ingredients')) {
      ingredients.push(filter.replace('ingredients-', ''));
    } else if (filter.includes('cuisine')) {
      cuisine.push(filter.replace('cuisine-', ''));
    } else if (filter.includes('diet')) {
      diet.push(filter.replace('diet-', ''));
    } else if (filter.includes('intolerances')) {
      intolerances.push(filter.replace('intolerances-', ''));
    } else if (filter.includes('type')) {
      type = filter.replace('type-', '');
    } else if (filter.includes('sort')) {
      sort = filter.replace('sort-', '').split(' ');
      [sortType, direction] = sort;
    }
  });
  searchService
    .getSearch(
      search,
      ingredients,
      cuisine,
      diet,
      intolerances,
      type,
      sortType,
      direction,
      page,
    )
    .then((res) => {
      setItems(res.recipes);
      setMoreItems(res.nextPage);
      setLoading(0);
    })
    .catch((e) => {
      if (e.response.status === 503) setLoading(5);
      else setLoading(4);
    });
};
