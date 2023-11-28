import { recipe1 } from '../tests/testData/recipe.json';

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

export default {
  getRecipe, getRecipeByDate, postCalendar, postFavourite, deleteFavourite, postDolater, postFinished
};
