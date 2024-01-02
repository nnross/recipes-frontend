/* eslint-disable no-plusplus */
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
// eslint-disable-next-line max-len
const getSearch = async (id, token, search, ingredients, cuisine, diet, intolerances, type, sort, direction, page) => {
  const res = await axios.get(`http://localhost:8080/recipe/get/api/search?search=${search}&ingredients=${ingredients}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}&type=${type}&sort=${sort}&sortDirection=${direction}&page=${page}`);
  return res.data;
};

export default { getSomeRecipes, getSearch };
