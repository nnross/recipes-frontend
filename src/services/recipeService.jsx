import axios from 'axios';

const baseUrl = 'http://localhost:8080/recipe';

/**
 * Gets recipe with id from the API.
 * @param {Int} id - id of recipe
 * @returns recipe from API.
 */
const getRecipe = async (id) => {
  const res = await axios.get(`http://localhost:8080/recipe/get/api/id?id=${id}`);
  return res.data;
};

const getRecipeFromDb = async (recipeId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`http://localhost:8080/recipe/get/db?recipeId=${recipeId}`, config);
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

const putFinished = (recipeId, accountId, token) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  })
);

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
  postRecipe,
  putFinished,
  getDoLater,
  getFavourite,
  putFavourite,
  putDoLater,
  putCalendar,
  getRecipeFromDb,
};
