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
  let ingredients = '';
  let cuisine = '';
  let diet = '';
  let intolerances = '';
  let type = '';
  let sort = '';
  let direction = '';
  let intPage = 0;

  if (page.current !== undefined) {
    intPage = page.current;
  } else {
    intPage = page;
  }

  filters.forEach((filter) => {
    if (filter.includes('ingredients')) {
      ingredients = filter.replace('ingredients-', '');
    } else if (filter.includes('cuisine')) {
      cuisine = filter.replace('cuisine-', '');
    } else if (filter.includes('diet')) {
      diet = filter.replace('diet-', '');
    } else if (filter.includes('intolerances')) {
      intolerances = filter.replace('intolerances-', '');
    } else if (filter.includes('type')) {
      type = filter.replace('type-', '');
    } else if (filter.includes('sort')) {
      sort = filter.replace('sort-', '');
    } else if (filter.includes('direction')) {
      direction = filter.replace('direction-', '');
    }
  });

  searchService
    // eslint-disable-next-line max-len
    .getSearch(id, token, search, ingredients, cuisine, diet, intolerances, type, sort, direction, intPage)
    .then((res) => {
      setItems(res.recipes);
      setMoreItems(res.nextPage);
      setLoading(0);
    })
    .catch(() => {
      setLoading(4);
    });
};
