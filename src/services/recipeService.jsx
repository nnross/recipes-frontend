import axios from 'axios';
import { recipe1 } from '../tests/testData/recipe.json';
import { withMore, withNoMore } from '../tests/testData/itemList.json';

const baseUrl = 'http://localhost:8080/recipe';

const getRecipe = async (id) => {
  const res = await axios.get(`http://localhost:8080/recipe/get/api/id?id=${id}`);
  return res.data;
};

const putCalendar = async (recipeId, date, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.put(`${baseUrl}/set/calendar?recipeId=${recipeId}&date=${date}`, {}, config);
  return res.data;
};

const putFavourite = async (recipeId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.put(`${baseUrl}/set/favourite?recipeId=${recipeId}`, {}, config);
  return res.data;
};

const putDolater = async (recipeId, token) => {
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
  putDolater,
  putCalendar,
};
