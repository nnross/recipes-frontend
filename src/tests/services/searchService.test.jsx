import * as axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import searchService from '../../services/searchService';
import { withMore } from '../testData/imageListItems.json';

const mockGet = jest.fn();

jest.mock('axios');

beforeEach(() => {
  jest.clearAllMocks();

  axios.get.mockImplementation((url, config) => {
    mockGet(url, config);
    return Promise.resolve({ data: withMore });
  });
});

describe('searchService tests', () => {
  test('getSomeRecepies calls correctly', async () => {
    const res = await searchService.getSomeRecipes(0, 'token');

    await waitFor(() => {
      expect(res).toBe(withMore);

      expect(mockGet.mock.calls).toHaveLength(1);
      expect(mockGet.mock.calls[0][0]).toBe('http://localhost:8080/recipe/get/api/random');
    });
  });
  test('getSearch calls correctly', async () => {
    const res = await searchService.getSearch('search', 'ingredients', 'cuisine', 'diet', 'intolerance', 'type', 'sort', 'dir', 0);

    await waitFor(() => {
      expect(res).toBe(withMore);

      expect(mockGet.mock.calls).toHaveLength(1);
      expect(mockGet.mock.calls[0][0]).toBe('http://localhost:8080/recipe/get/api/search?search=search&ingredients=ingredients&cuisine=cuisine&diet=diet&intolerances=intolerance&type=type&sort=sort&sortDirection=dir&page=0');
    });
  });
});
