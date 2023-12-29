/* eslint-disable import/prefer-default-export */
import recipeService from '../../services/recipeService';

export const UseGetItems = (id, token, selection, page, setItems, setNextPage, setLoading) => {
  if (selection === 'favourite') {
    recipeService.getFavourite(id, token, page)
      .then((res) => {
        console.log(res);
        setItems(res.recipes);
        setNextPage(res.nextPage);
        setLoading(0);
      })
      .catch(() => {
        setLoading(4);
      });
  } else {
    recipeService.getDoLater(id, token, page)
      .then((res) => {
        setItems(res.recipes);
        setNextPage(res.nextPage);
        setLoading(0);
      })
      .catch(() => {
        setLoading(4);
      });
  }
};
