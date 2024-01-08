import axios from 'axios';

/**
 * Gets some recepies from the API.
 * @returns some recipes from API.
 */
const getSomeRecipes = async () => {
  const res = await axios.get('http://localhost:8080/recipe/get/api/random');
  return res.data;
};

/**
 * Gets search from the API.
 * @param {String} search - search to be used.
 * @param {List<String>} ingredients - indgredients to be used.
 * @param {List<String>} cuisine - cuisine to be used.
 * @param {List<String>} diet - diets to be used.
 * @param {List<String>} intolerances - intolerances to be used.
 * @param {List<String>} type - types to be used.
 * @param {String} sort - sort to be used.
 * @param {String} direction - sort direction to be used.
 * @param {Int} page - page to be used.
 * @returns results based on filters.
 */
const getSearch = async (
  search,
  ingredients,
  cuisine,
  diet,
  intolerances,
  type,
  sort,
  direction,
  page,
) => {
  const res = await axios.get(`http://localhost:8080/recipe/get/api/search?search=${search}&ingredients=${ingredients}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}&type=${type}&sort=${sort}&sortDirection=${direction}&page=${page}`);
  return res.data;
};

export default { getSomeRecipes, getSearch };
