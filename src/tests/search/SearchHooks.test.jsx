/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import { UseSearch } from '../../pages/search/searchHooks';
import { getSearch } from '../../services/searchService';
import { withMore } from '../testData/itemList.json';

const getSearchMock = jest.fn();
jest.mock('../../services/searchService', () => ({
  getSearch: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();

  getSearch.mockImplementation((
    search,
    ingredients,
    cuisine,
    diet,
    intolerances,
    type,
    sortType,
    direction,
    page,
  ) => {
    getSearchMock(
      search,
      ingredients,
      cuisine,
      diet,
      intolerances,
      type,
      sortType,
      direction,
      page,
    );
    return Promise.resolve(withMore);
  });
});

describe('searchHooks tests', () => {
  test('getSearch works', async () => {
    const mockLoading = jest.fn();
    const mockSet = jest.fn();
    const mockSetMore = jest.fn();

    UseSearch('testId', 'testToken', 'testSearch', ['ingredients-test1', 'cuisine-test2', 'diet-test3', 'intolerances-test4', 'type-test5', 'sort-test6 asc', ''], 0, mockSet, mockSetMore, mockLoading);

    await waitFor(() => {
      expect(getSearchMock.mock.calls).toHaveLength(1);
      expect(getSearch.mock.calls[0][0]).toBe('testSearch');
      expect(getSearch.mock.calls[0][1]).toStrictEqual(['test1']);
      expect(getSearch.mock.calls[0][2]).toStrictEqual(['test2']);
      expect(getSearch.mock.calls[0][3]).toStrictEqual(['test3']);
      expect(getSearch.mock.calls[0][4]).toStrictEqual(['test4']);
      expect(getSearch.mock.calls[0][5]).toStrictEqual('test5');
      expect(getSearch.mock.calls[0][6]).toStrictEqual('test6');
      expect(getSearch.mock.calls[0][7]).toStrictEqual('asc');
      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(0);
      expect(mockSet.mock.calls).toHaveLength(1);
      expect(mockSet.mock.calls[0][0]).toBe(withMore.recipes);
      expect(mockSetMore.mock.calls).toHaveLength(1);
      expect(mockSetMore.mock.calls[0][0]).toBe(withMore.nextPage);
    });
  });
  test('getSearch 403 error works', async () => {
    getSearch.mockImplementation(() => {
      const error = new Error();
      error.response = { status: 403 };
      return Promise.reject(error);
    });
    const mockLoading = jest.fn();
    const mockSet = jest.fn();
    const mockSetMore = jest.fn();

    UseSearch('testId', 'testToken', 'testSearch', ['ingredients-test'], 0, mockSet, mockSetMore, mockLoading);

    await waitFor(() => {
      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(4);
    });
  });
  test('getSearch 503 error works', async () => {
    getSearch.mockImplementation(() => {
      const error = new Error();
      error.response = { status: 503 };
      return Promise.reject(error);
    });
    const mockLoading = jest.fn();
    const mockSet = jest.fn();
    const mockSetMore = jest.fn();

    UseSearch('testId', 'testToken', 'testSearch', ['ingredients-test', 'cuisine-test', 'diet-test', 'intolerances-test', 'type-test', 'sort-test'], 0, mockSet, mockSetMore, mockLoading);

    await waitFor(() => {
      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(5);
    });
  });
});
