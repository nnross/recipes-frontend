import axios from 'axios';
import { recipe1 } from '../tests/testData/recipe.json';
import { withMore, withNoMore } from '../tests/testData/itemList.json';

import axios from 'axios';

const baseUrl = 'http://localhost:8080/recipe';

// TODO: actual call to backend.
const getRecipe = async (id) => {
  const res = await axios.get(`http://localhost:8080/recipe/get/api/id?id=${id}`);
  return res.data;
};

const getRecipeByDate = (date, accountId, token) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(recipe1);
    }, 1000);
  })
);

const postCalendar = (recipeId, accountId, date, token) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  })
);

const postFavourite = (recipeId, accountId, token) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
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
  postCalendar,
  postFavourite,
  deleteFavourite,
  postDolater,
  postFinished,
  getDoLater,
  getFavourite,
};
