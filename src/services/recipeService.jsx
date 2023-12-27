import axios from 'axios';
import { recipe1 } from '../tests/testData/recipe.json';
import { withMore, withNoMore } from '../tests/testData/itemList.json';

// TODO: actual call to backend.
const getRecipe = async (id) => {
  const res = await axios.get(`http://localhost:8080/api/recipe/get/api/id?id=${id}`);
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
// TODO: actual call to backend
const getFavourite = (id, token, page) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(withMore);
    }, 1000);
  })
);

/* eslint-disable no-unused-vars */
// TODO: actual call to backend
const getDoLater = (id, token, page) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(withNoMore);
    }, 1000);
  })
);

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
