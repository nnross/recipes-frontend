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

  axios.post.mockImplementation((url, payload, config) => {
    mock(url, payload, config);
    return Promise.resolve({ data: true });
  });

  axios.get.mockImplementation((url, config) => {
    mock(url, config);
    return Promise.resolve({ data: recipe });
  });

  axios.put.mockImplementation((url, payload, config) => {
    mock(url, config);
    return Promise.resolve({ data: true });
  });
});

describe('recipeService tests', () => {
  test('post recipe calls correctly', async () => {
    const res = await recipeService.postRecipe('token', { data: 'test' });
    const config = {
      headers: { Authorization: 'Bearer token' },
    };

    await waitFor(() => {
      expect(res).toBe(true);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe('http://localhost:8080/recipe/add');
      expect(mock.mock.calls[0][1]).toStrictEqual({ data: 'test' });
      expect(mock.mock.calls[0][2]).toStrictEqual(config);
    });
  });
  test('getRecipe calls correctly', async () => {
    const res = await recipeService.getRecipe(0);

    await waitFor(() => {
      expect(res).toBe(recipe);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe('http://localhost:8080/recipe/get/api/id?id=0');
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

  test('putFavourite calls correctly', async () => {
    const res = await recipeService.putFavourite(1, 'token');
    const config = {
      headers: { Authorization: 'Bearer token' },
    };

    await waitFor(() => {
      expect(res).toBe(true);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe('http://localhost:8080/recipe/set/favourite?recipeId=1');
      expect(mock.mock.calls[0][1]).toStrictEqual(config);
    });
  });

  test('putDoLater calls correctly', async () => {
    const res = await recipeService.putDoLater(1, 'token');
    const config = {
      headers: { Authorization: 'Bearer token' },
    };

    await waitFor(() => {
      expect(res).toBe(true);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe('http://localhost:8080/recipe/set/doLater?recipeId=1');
      expect(mock.mock.calls[0][1]).toStrictEqual(config);
    });
  });

  test('putCalendar calls correctly', async () => {
    const res = await recipeService.putCalendar(1, '2022-12-12', 'token');
    const config = {
      headers: { Authorization: 'Bearer token' },
    };

    await waitFor(() => {
      expect(res).toBe(true);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe('http://localhost:8080/recipe/set/calendar?recipeId=1&date=2022-12-12');
      expect(mock.mock.calls[0][1]).toStrictEqual(config);
    });
  });
});
