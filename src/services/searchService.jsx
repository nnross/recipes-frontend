import axios from 'axios';

const getSomeRecipes = async () => {
  const res = await axios.get('http://localhost:8080/recipe/get/api/random');
  return res.data;
};

const getSearch = async (
  search,
  ingredients,
  cuisine,
  diet,
  intolerances,
  type,
  sort,
  direction,
  page,
) => {
  const res = await axios.get(`http://localhost:8080/recipe/get/api/search?search=${search}&ingredients=${ingredients}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}&type=${type}&sort=${sort}&sortDirection=${direction}&page=${page}`);
  return res.data;
};

export default { getSomeRecipes, getSearch };
