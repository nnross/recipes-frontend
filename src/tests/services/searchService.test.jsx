import * as axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import { getSomeRecipes, getSearch } from '../../services/searchService';
import { user } from '../testData/account.json';

const mockGet = jest.fn();

jest.mock('axios');

beforeEach(() => {
  axios.get.mockImplementation((url, config) => {
    mockGet(url, config);
    Promise.resolve(user);
  });
});

describe('searchService tests', () => {
  test('getSomeRecepies calls correctly', async () => {
    const res = getSomeRecipes(0, 'token');

    await waitFor(() => {
      expect(res).toBe(user);

      expect(mockGet.mock.calls).toHaveLength(1);
      expect(mockGet.mock.calls[0][0]).toBe('URL');
    });
  });
  test('getSearch calls correctly', async () => {
    const res = getSomeRecipes(0, 'token');

    await waitFor(() => {
      expect(res).toBe(user);

      expect(mockGet.mock.calls).toHaveLength(1);
      expect(mockGet.mock.calls[0][0]).toBe('URL');
    });
  });
});
