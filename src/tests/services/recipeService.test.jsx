import * as axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import {
  getRecipe, postCalendar, postFavourite, postDoLater, getFavourite, getDoLater,
} from '../../services/recipeService';
import { user } from '../testData/account.json';
import { recipe } from '../testData/recipe.json';

const mockPost = jest.fn();

jest.mock('axios');

beforeEach(() => {
  axios.post.mockImplementation((url, config) => {
    mockPost(url, config);
    Promise.resolve(recipe);
  });

  axios.put.mockImplementation((url, config) => {
    mockPost(url, config);
    Promise.resolve();
  });
});

describe('recipeService tests', () => {
  test('getRecipe calls correctly', async () => {
    const res = getRecipe(0, 'token');
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
    const res = getFavourite(0, 'token');
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

  test('getDoLater calls correctly', async () => {
    const res = getDoLater(0, 'token');
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
