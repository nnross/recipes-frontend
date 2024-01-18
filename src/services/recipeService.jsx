import axios from 'axios';

const baseUrl = 'https://recipes-backend-wxel.onrender.com/recipe';

/**
 * Gets recipe with id from the API.
 * @param {Int} id - id of recipe
 * @returns recipe from API.
 */
const getRecipe = async (id) => {
  const res = await axios.get(`${baseUrl}/get/api/id?id=${id}`);
  return res.data;
};

/**
 * To call to backend to get a recipe for date from the database
 * @param {String} date The date a recipe is wanted for
 * @param {Integer} accountId Id of the account the recipe is for
 * @param {String} token Token for the account
 * @returns data for the recipe
 */
const getTodays = async (date, accountId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`https://recipes-backend-wxel.onrender.com/pages/get/todays?accountId=${accountId}&date=${date}`, config);
  return res.data;
};

/**
 * Gets recipe from databse with id.
 * @param {Integer} recipeId - id of the recipe
 * @param {Integer} token - token for user
 * @returns found recipe.
 */
const getRecipeFromDb = async (recipeId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`https://recipes-backend-wxel.onrender.com/recipe/get/db?recipeId=${recipeId}`, config);
  return res.data;
};

/**
 * sets recipes calendar date.
 * @param {Int} recipeId - recipes is.
 * @param {String} date - date to be used.
 * @param {String} token - token of user
 * @returns true if successful.
 */
const putCalendar = async (recipeId, date, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.put(`${baseUrl}/set/calendar?recipeId=${recipeId}&date=${date}`, {}, config);
  return res.data;
};

/**
 * toggles recipes favourite state.
 * @param {Int} recipeId - recipes id.
 * @param {String} token - token of user
 * @returns true if successful.
 */
const putFavourite = async (recipeId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.put(`${baseUrl}/set/favourite?recipeId=${recipeId}`, {}, config);
  return res.data;
};

/**
 * toggles recipes doLater state.
 * @param {Int} recipeId - recipes id.
 * @param {String} token - token of user
 * @returns true if successful.
 */
const putDoLater = async (recipeId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.put(`${baseUrl}/set/doLater?recipeId=${recipeId}`, {}, config);
  return res.data;
};

/**
 * puts recipe as finisehd
 * @param {*} recipeId recipe to be finished
 * @param {*} token token of the account
 * @returns true if successful
 */
const putFinished = async (recipeId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.put(`${baseUrl}/set/finished?recipeId=${recipeId}`, {}, config);
  return res.data;
};

/**
 * Adds recipe to the database.
 * @param {String} token - token of user.
 * @param {JSON} payload - recipe to be added.
 * @returns true if successful.
 */
const postRecipe = async (token, payload) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.post(`${baseUrl}/add`, payload, config);
  return res.data;
};

/**
 * Gets the favourite recipes for selected account.
 * @param {Integer} accountId - id of the account.
 * @param {String} token - token for the account.
 * @param {Integer} page - selected page.
 * @returns favourite recipes and data on if there is more results.
 */
const getFavourite = async (accountId, token, page) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`${baseUrl}/get/favourite?accountId=${accountId}&page=${page}`, config);
  return res.data;
};

/**
 * Gets the doLater recipes for selected account.
 * @param {Integer} accountId - id of the account.
 * @param {String} token - token for the account.
 * @param {Integer} page - selected page.
 * @returns doLater recipes and data on if there is more results.
 */
const getDoLater = async (accountId, token, page) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`${baseUrl}/get/doLater?accountId=${accountId}&page=${page}`, config);
  return res.data;
};

export default {
  getRecipe,
  getTodays,
  postRecipe,
  putFinished,
  getDoLater,
  getFavourite,
  putFavourite,
  putDoLater,
  putCalendar,
  getRecipeFromDb,
};
