import { recipe1 } from '../tests/testData/recipe.json';
import { withMore, withNoMore } from '../tests/testData/itemList.json';

import axios from 'axios';

const baseUrl = 'http://localhost:8080/recipe';

// TODO: actual call to backend.
const getRecipe = (id) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(recipe1);
    }, 1000);
  })
);

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

const getFavourite = async (accountId, token, page) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`${baseUrl}/get/favourite?accountId=${accountId}&page=${page}`, config);
  return res.data;
};

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
