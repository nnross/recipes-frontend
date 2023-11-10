/* eslint-disable no-unused-vars */
import { withMore } from '../tests/testData/imageListItems.json';

// TODO: actual call to backend.
const getSomeRecipes = (id, token, setLoading) => {
  setLoading(1);
  return (withMore);
};

export default { getSomeRecipes };
