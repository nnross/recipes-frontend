import axios from 'axios';

const baseUrl = 'http://localhost:8080/recipe';

/**
 * The call to backend to get a recipe with id from API
 * @param {*} id of the recipe wanted
 * @returns singular recipe from the API
 */
const getRecipe = async (id) => {
  const res = await axios.get(`${baseUrl}/get/api/id?id=${id}`);
  return res.data;
};

/**
 * The call to backend to get a recipe from the database
 * @param {*} date date the recipe is wanted for
 * @param {*} accountId id of the account
 * @param {*} token token for the account
 * @returns data for the recipe
 */
const getRecipeByDate = async (date, accountId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/get/date?accountId=${accountId}&date=${date}`, config);
  return res.data;
};

const getTodays = async (date, accountId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`http://localhost:8080/pages/get/todays?accountId=${accountId}&date=${date}`, config);
  return res.data;
};

const postCalendar = (recipeId, accountId, date, token) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  })
);

const postFavourite = (recipeId, accountId, token) => (
  new Promise((resolve, reject) => {
    reject();
  })
);

const deleteFavourite = (recipeId, accountId, token) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  })
);

const postDolater = (recipeId, accountId, token) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  })
);

const postFinished = (recipeId, accountId, date, token) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  })
);

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
  getRecipeByDate,
  getTodays,
  postCalendar,
  postFavourite,
  deleteFavourite,
  postDolater,
  postFinished,
  getDoLater,
  getFavourite,
};
