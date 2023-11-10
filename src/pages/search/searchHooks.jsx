/* eslint-disable import/prefer-default-export */
import searchService from '../../services/searchService';

export const UseSearch = (id, token, search, filters, page, setItems, setMoreItems, setLoading) => {
  // TODO: preprocessing for actual call
  searchService.getSearch(id, token, search, filters, page)
    .then((res) => {
      setItems(res.items);
      setMoreItems(res.moreItems);
      setLoading(0);
    })
    .catch(() => {
      setLoading(4);
    });
};
