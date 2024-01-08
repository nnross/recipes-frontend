/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import { UseTag, addToDb } from '../../pages/recipe/recipeHooks';
import {
  recipe,
  favouriteFormatted,
  doLaterFormatted,
  calendarFormatted,
} from '../testData/hookRecipe.json';
import {
  putFavourite, putDoLater, putCalendar, postRecipe,
} from '../../services/recipeService';

const mockFavourite = jest.fn();
const mockDoLater = jest.fn();
const mockCalendar = jest.fn();
const mockPost = jest.fn();
jest.mock('../../services/recipeService', () => ({
  putFavourite: jest.fn(),
  putDoLater: jest.fn(),
  putCalendar: jest.fn(),
  postRecipe: jest.fn(),
}));

beforeEach(() => {
  jest.useRealTimers();
  jest.clearAllMocks();

  postRecipe.mockImplementation((token, payload) => {
    mockPost(token, payload);
    return Promise.resolve();
  });

  putFavourite.mockImplementation((recipeId, accountId, token) => {
    mockFavourite(recipeId, accountId, token);
    return Promise.resolve();
  });
  putDoLater.mockImplementation((recipeId, accountId, token) => {
    mockDoLater(recipeId, accountId, token);
    return Promise.resolve();
  });
  putCalendar.mockImplementation((recipeId, accountId, date, token) => {
    mockCalendar(recipeId, accountId, date, token);
    return Promise.resolve();
  });
});

describe('recipeHook tests', () => {
  test('UseTag favourite works', async () => {
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    UseTag('favourite', 2, null, 'token', mockLoading, mockSet, true);

    await waitFor(() => {
      expect(mockFavourite.mock.calls).toHaveLength(1);
      expect(mockFavourite.mock.calls[0][0]).toBe(2);
      expect(mockFavourite.mock.calls[0][1]).toBe('token');

      expect(mockDoLater.mock.calls).toHaveLength(0);
      expect(mockCalendar.mock.calls).toHaveLength(0);

      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(0);

      expect(mockSet.mock.calls).toHaveLength(1);
      expect(mockSet.mock.calls[0][0]).toBe(false);
    });
  });
  test('UseTag doLater works', async () => {
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    UseTag('doLater', 2, null, 'token', mockLoading, mockSet, false);

    await waitFor(() => {
      expect(mockDoLater.mock.calls).toHaveLength(1);
      expect(mockDoLater.mock.calls[0][0]).toBe(2);
      expect(mockDoLater.mock.calls[0][1]).toBe('token');

      expect(mockFavourite.mock.calls).toHaveLength(0);
      expect(mockCalendar.mock.calls).toHaveLength(0);

      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(0);

      expect(mockSet.mock.calls).toHaveLength(1);
      expect(mockSet.mock.calls[0][0]).toBe(true);
    });
  });
  test('UseTag toCalendar works', async () => {
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    UseTag('toCalendar', 2, '12-12-2022', 'token', mockLoading, mockSet, false);

    await waitFor(() => {
      expect(mockCalendar.mock.calls).toHaveLength(1);
      expect(mockCalendar.mock.calls[0][0]).toBe(2);
      expect(mockCalendar.mock.calls[0][1]).toBe('12-12-2022');
      expect(mockCalendar.mock.calls[0][2]).toBe('token');

      expect(mockFavourite.mock.calls).toHaveLength(0);
      expect(mockDoLater.mock.calls).toHaveLength(0);

      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(0);

      expect(mockSet.mock.calls).toHaveLength(1);
      expect(mockSet.mock.calls[0][0]).toBe(true);
    });
  });
  test('UseTag favourite error works', async () => {
    jest.useFakeTimers();
    putFavourite.mockImplementation(() => Promise.reject());
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    UseTag('favourite', 2, null, 'token', mockLoading, mockSet);

    await waitFor(() => {
      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(4);
    });

    jest.advanceTimersByTime(1100);

    expect(mockLoading.mock.calls).toHaveLength(2);
    expect(mockLoading.mock.calls[1][0]).toBe(0);
  });
  test('UseTag doLater error works', async () => {
    jest.useFakeTimers();
    putDoLater.mockImplementation(() => Promise.reject());
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    UseTag('doLater', 2, null, 'token', mockLoading, mockSet);

    await waitFor(() => {
      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(4);
    });

    jest.advanceTimersByTime(1100);

    expect(mockLoading.mock.calls).toHaveLength(2);
    expect(mockLoading.mock.calls[1][0]).toBe(0);
  });
  test('UseTag toCalendar error works', async () => {
    jest.useFakeTimers();
    putCalendar.mockImplementation(() => Promise.reject());
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    UseTag('toCalendar', 2, null, 'token', mockLoading, mockSet);

    await waitFor(() => {
      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(4);
    });

    jest.advanceTimersByTime(1100);

    expect(mockLoading.mock.calls).toHaveLength(2);
    expect(mockLoading.mock.calls[1][0]).toBe(0);
  });

  test('addToDb favourite works', async () => {
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    addToDb('favourite', 2, 'token', recipe, null, mockLoading, mockSet);

    await waitFor(() => {
      expect(mockPost.mock.calls).toHaveLength(1);
      expect(mockPost.mock.calls[0][0]).toBe('token');

      expect(mockPost.mock.calls[0][1]).toStrictEqual(favouriteFormatted);

      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(0);

      expect(mockSet.mock.calls).toHaveLength(1);
      expect(mockSet.mock.calls[0][0]).toBe(true);
    });
  });
  test('addToDb doLater works', async () => {
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    addToDb('doLater', 2, 'token', recipe, null, mockLoading, mockSet);

    await waitFor(() => {
      expect(mockPost.mock.calls).toHaveLength(1);
      expect(mockPost.mock.calls[0][0]).toBe('token');

      expect(mockPost.mock.calls[0][1]).toStrictEqual(doLaterFormatted);

      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(0);

      expect(mockSet.mock.calls).toHaveLength(1);
      expect(mockSet.mock.calls[0][0]).toBe(true);
    });
  });
  test('addToDb calendar works', async () => {
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    addToDb('toCalendar', 2, 'token', recipe, '2022-12-12', mockLoading, mockSet);

    await waitFor(() => {
      expect(mockPost.mock.calls).toHaveLength(1);
      expect(mockPost.mock.calls[0][0]).toBe('token');

      expect(mockPost.mock.calls[0][1]).toStrictEqual(calendarFormatted);

      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(0);

      expect(mockSet.mock.calls).toHaveLength(1);
      expect(mockSet.mock.calls[0][0]).toBe(true);
    });
  });
  test('addToDb favourite error works', async () => {
    jest.useFakeTimers();
    postRecipe.mockImplementation(() => Promise.reject());
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    addToDb('favourite', 2, 'token', recipe, null, mockLoading, mockSet);

    await waitFor(() => {
      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(4);
    });
    jest.advanceTimersByTime(1100);

    expect(mockLoading.mock.calls).toHaveLength(2);
    expect(mockLoading.mock.calls[1][0]).toBe(0);
  });
  test('addToDb doLater error works', async () => {
    jest.useFakeTimers();
    postRecipe.mockImplementation(() => Promise.reject());
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    addToDb('doLater', 2, 'token', recipe, null, mockLoading, mockSet);

    await waitFor(() => {
      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(4);
    });
    jest.advanceTimersByTime(1100);

    expect(mockLoading.mock.calls).toHaveLength(2);
    expect(mockLoading.mock.calls[1][0]).toBe(0);
  });
  test('addToDb calendar error works', async () => {
    jest.useFakeTimers();
    postRecipe.mockImplementation(() => Promise.reject());
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    addToDb('toCalendar', 2, 'token', recipe, null, mockLoading, mockSet);

    await waitFor(() => {
      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(4);
    });
    jest.advanceTimersByTime(1100);

    expect(mockLoading.mock.calls).toHaveLength(2);
    expect(mockLoading.mock.calls[1][0]).toBe(0);
  });
});
