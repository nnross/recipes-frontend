/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
import { withMore, withNoMore } from '../tests/testData/imageListItems.json';

// TODO: actual call to backend.
const getSomeRecipes = (id, token) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(withMore);
    }, 1000);
  })
);

// TODO: actual call to backend
const getSearch = (id, token, search, filters, page) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(withNoMore);
    }, 1000);
  })
);

export default { getSomeRecipes, getSearch };
