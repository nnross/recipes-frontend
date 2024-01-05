import * as axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import recipeService from '../../services/recipeService';
import { user } from '../testData/account.json';
import { recipe } from '../testData/recipe.json';

const mock = jest.fn();

jest.mock('axios');

beforeEach(() => {
  jest.clearAllMocks();

  axios.post.mockImplementation((url, config) => {
    mock(url, config);
    Promise.resolve(recipe);
  });

  axios.get.mockImplementation((url, config) => {
    mock(url, config);
    return Promise.resolve({ date: recipe });
  });

  axios.put.mockImplementation((url, config) => {
    mock(url, config);
    Promise.resolve();
  });
});

describe('recipeService tests', () => {
  test('getRecipe calls correctly', async () => {
    const res = recipeService.getRecipe(0, 'token');
    const config = {
      headers: { Authorization: 'Bearer token' },
    };

    await waitFor(() => {
      expect(res).toBe(recipe);

      expect(mockPost.mock.calls).toHaveLength(1);
      expect(mockPost.mock.calls[0][0]).toBe('URL');
      expect(mockPost.mock.calls[0][1]).toBe(config);
    });
  });

  test('getFavourite calls correctly', async () => {
    const res = await recipeService.getFavourite(0, 'token', 0);
    const config = {
      headers: { Authorization: 'Bearer token' },
    };

    await waitFor(() => {
      expect(res).toBe(recipe);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe('http://localhost:8080/recipe/get/favourite?accountId=0&page=0');
      expect(mock.mock.calls[0][1]).toStrictEqual(config);
    });
  });

  test('getDoLater calls correctly', async () => {
    const res = await recipeService.getDoLater(0, 'token', 0);
    const config = {
      headers: { Authorization: 'Bearer token' },
    };

    await waitFor(() => {
      expect(res).toBe(recipe);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe('http://localhost:8080/recipe/get/doLater?accountId=0&page=0');
      expect(mock.mock.calls[0][1]).toStrictEqual(config);
    });
  });

  test('postFavourite calls correctly', async () => {
    const res = postFavourite(1, 0, 'token');
    const config = {
      headers: { Authorization: 'Bearer token' },
    };

    await waitFor(() => {
      expect(res).toBe(true);

      expect(mockPost.mock.calls).toHaveLength(1);
      expect(mockPost.mock.calls[0][0]).toBe('URL');
      expect(mockPost.mock.calls[0][1]).toBe(config);
    });
  });

  test('postDoLater calls correctly', async () => {
    const res = postDoLater(1, 0, 'token');
    const config = {
      headers: { Authorization: 'Bearer token' },
    };

    await waitFor(() => {
      expect(res).toBe(true);

      expect(mockPost.mock.calls).toHaveLength(1);
      expect(mockPost.mock.calls[0][0]).toBe('URL');
      expect(mockPost.mock.calls[0][1]).toBe(config);
    });
  });

  test('postCalendar calls correctly', async () => {
    const res = getRecipe(1, 0, '2022-12-12', 'token');
    const config = {
      headers: { Authorization: 'Bearer token' },
    };

    await waitFor(() => {
      expect(res).toBe(true);

      expect(mockPost.mock.calls).toHaveLength(1);
      expect(mockPost.mock.calls[0][0]).toBe('URL');
      expect(mockPost.mock.calls[0][1]).toBe(config);
    });
  });
});
