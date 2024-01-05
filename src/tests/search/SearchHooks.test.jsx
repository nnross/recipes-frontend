/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import { UseSearch } from '../../pages/search/searchHooks';
import { getSearch } from '../../services/searchService';
import { response } from '../testData/apiRes.json';

const mockSearch = jest.fn();

jest.mock('../../services/searchService', () => ({
  getSearch: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();

  getSearch.mockImplementation((
    id,
    token,
    search,
    ingredients,
    cuisine,
    diet,
    intolerances,
    type,
    sortType,
    direction,
    intPage,
  ) => {
    mockSearch(
      id,
      token,
      search,
      ingredients,
      cuisine,
      diet,
      intolerances,
      type,
      sortType,
      direction,
      intPage,
    );
    return Promise.resolve(response);
  });
});

describe('searchHooks tests', () => {
  test('UseSearch works', async () => {
    const mockSet = jest.fn();
    const mockLoading = jest.fn();
    const mockMore = jest.fn();

    UseSearch(1, 'token', 'search', [], 0, mockSet, mockMore, mockLoading);

    await waitFor(() => {
      expect(mockSearch.mock.calls).toHaveLength(1);
      expect(mockSearch.mock.calls[0][0]).toBe(1);
      expect(mockSearch.mock.calls[0][1]).toBe('token');
      expect(mockSearch.mock.calls[0][2]).toBe('search');
      expect(mockSearch.mock.calls[0][3]).toStrictEqual([]);
      expect(mockSearch.mock.calls[0][4]).toStrictEqual([]);
      expect(mockSearch.mock.calls[0][5]).toStrictEqual([]);
      expect(mockSearch.mock.calls[0][6]).toStrictEqual([]);
      expect(mockSearch.mock.calls[0][7]).toStrictEqual('');
      expect(mockSearch.mock.calls[0][8]).toBe('');
      expect(mockSearch.mock.calls[0][9]).toBe('');
      expect(mockSearch.mock.calls[0][10]).toBe(0);

      expect(mockSet.mock.calls).toHaveLength(1);
      expect(mockSet.mock.calls[0][0]).toBe(response.recipes);

      expect(mockMore.mock.calls).toHaveLength(1);
      expect(mockMore.mock.calls[0][0]).toBe(response.nextPage);

      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(0);
    });
  });
  test('UseSearch all filters works', async () => {
    const mockSet = jest.fn();
    const mockLoading = jest.fn();
    const mockMore = jest.fn();

    UseSearch(1, 'token', 'search', ['ingredients-testIngredient', 'cuisine-testCuisine', 'diet-testDiet', 'intolerances-testIntolerances', 'type-testType', 'sort-testSort'], 0, mockSet, mockMore, mockLoading);

    await waitFor(() => {
      expect(mockSearch.mock.calls).toHaveLength(1);
      expect(mockSearch.mock.calls[0][3]).toStrictEqual(['testIngredient']);
      expect(mockSearch.mock.calls[0][4]).toStrictEqual(['testCuisine']);
      expect(mockSearch.mock.calls[0][5]).toStrictEqual(['testDiet']);
      expect(mockSearch.mock.calls[0][6]).toStrictEqual(['testIntolerances']);
      expect(mockSearch.mock.calls[0][7]).toStrictEqual('testType');
      expect(mockSearch.mock.calls[0][8]).toBe('testSort');
    });
  });
  test('UseSearch error works', async () => {
    getSearch.mockImplementation(() => Promise.resolve(response));

    const mockSet = jest.fn();
    const mockLoading = jest.fn();
    const mockMore = jest.fn();

    UseSearch(1, 'token', 'search', ['filters'], 0, mockSet, mockMore, mockLoading);

    await waitFor(() => {
      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(0);
    });
  });
});
