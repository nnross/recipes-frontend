/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import { UseSearch } from '../../pages/search/searchHooks';
import { getSearch } from '../../services/searchService';
import { withMore } from '../testData/imageListItems.json';

const mockSearch = jest.fn();

jest.mock('../../../services/searchService', () => ({
  getSearch: jest.fn(),
}));

beforeEach(() => {
  getSearch.mockImplementation((
    id,
    token,
    search,
    filters,
    page,
  ) => {
    mockSearch(id, token, search, filters, page);
    Promise.resolve(withMore);
  });
});

describe('searchHooks tests', () => {
  test('UseSearch works', async () => {
    const mockSet = jest.fn();
    const mockLoading = jest.fn();
    const mockMore = jest.fn();

    await UseSearch(1, 'token', 'search', 'filters', 0, mockSet, mockMore, mockLoading);

    await waitFor(() => {
      expect(mockSearch.mock.calls).toHaveLength(1);
      expect(mockSearch.mock.calls[0][0]).toBe(1);
      expect(mockSearch.mock.calls[0][1]).toBe('token');
      expect(mockSearch.mock.calls[0][2]).toBe('search');
      expect(mockSearch.mock.calls[0][3]).toBe('filter');
      expect(mockSearch.mock.calls[0][4]).toBe(0);

      expect(mockSet.mock.calls).toHaveLength(1);
      expect(mockSet.mock.calls[0][0]).toBe(withMore.items);

      expect(mockMore.mock.calls).toHaveLength(1);
      expect(mockMore.mock.calls[0][0]).toBe(withMore.moreResults);

      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(0);
    });
  });
  test('UseSearch error works', async () => {
    getSearch.mockImplementation(() => Promise.resolve(withMore));

    const mockSet = jest.fn();
    const mockLoading = jest.fn();
    const mockMore = jest.fn();

    await UseSearch(1, 'token', 'search', 'filters', 0, mockSet, mockMore, mockLoading);

    await waitFor(() => {
      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(0);
    });
  });
});
