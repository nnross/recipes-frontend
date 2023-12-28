/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { withMore, withNoMore } from '../tests/testData/imageListItems.json';

// TODO: actual call to backend.
const getSomeRecipes = async (id, token) => {
  const res = await axios.get('http://localhost:8080/recipe/get/api/random');
  return res.data;
};

// TODO: actual call to backend
const getSearch = (id, token, search, filters, page) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(withNoMore);
    }, 1000);
  })
);

export default { getSomeRecipes, getSearch };
