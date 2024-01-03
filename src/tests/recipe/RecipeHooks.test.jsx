/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import { UseTag } from '../../pages/recipe/recipeHooks';
import { postFavourite, postDoLater, postCalendar } from '../../services/recipeService';

const mockFavourite = jest.fn();
const mockDoLater = jest.fn();
const mockCalendar = jest.fn();
jest.mock('../../../services/recipeService', () => ({
  postFavourite: jest.fn(),
  postDoLater: jest.fn(),
  postCalendar: jest.fn(),
}));

beforeEach(() => {
  postFavourite.mockImplementation((recipeId, accountId, token) => {
    mockFavourite(recipeId, accountId, token);
    Promise.resolve();
  });
  postDoLater.mockImplementation((recipeId, accountId, token) => {
    mockDoLater(recipeId, accountId, token);
    Promise.resolve();
  });
  postCalendar.mockImplementation((recipeId, accountId, date, token) => {
    mockCalendar(recipeId, accountId, date, token);
    Promise.resolve();
  });
});

describe('recipeHook tests', () => {
  test('UseTag favourite works', async () => {
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    await UseTag('favourite', 2, 1, null, 'token', mockLoading, mockSet);

    await waitFor(() => {
      expect(mockFavourite.mock.calls).toHaveLength(1);
      expect(mockFavourite.mock.calls[0][0].toBe(2));
      expect(mockFavourite.mock.calls[0][1].toBe(1));
      expect(mockFavourite.mock.calls[0][2].toBe('token'));

      expect(mockDoLater.mock.calls).toHaveLength(0);
      expect(mockCalendar.mock.calls).toHaveLength(0);

      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toHaveLength(0);

      expect(mockSet.mock.calls).toHaveLength(1);
      expect(mockSet.mock.calls[0][0]).toHaveLength(true);
    });
  });
  test('UseTag doLater works', async () => {
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    await UseTag('doLater', 2, 1, null, 'token', mockLoading, mockSet);

    await waitFor(() => {
      expect(mockDoLater.mock.calls).toHaveLength(1);
      expect(mockDoLater.mock.calls[0][0].toBe(2));
      expect(mockDoLater.mock.calls[0][1].toBe(1));
      expect(mockDoLater.mock.calls[0][2].toBe('token'));

      expect(mockFavourite.mock.calls).toHaveLength(0);
      expect(mockCalendar.mock.calls).toHaveLength(0);

      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toHaveLength(0);

      expect(mockSet.mock.calls).toHaveLength(1);
      expect(mockSet.mock.calls[0][0]).toHaveLength(true);
    });
  });
  test('UseTag toCalendar works', async () => {
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    await UseTag('toCalendar', 2, 1, null, 'token', mockLoading, mockSet);

    await waitFor(() => {
      expect(mockCalendar.mock.calls).toHaveLength(1);
      expect(mockCalendar.mock.calls[0][0].toBe(2));
      expect(mockCalendar.mock.calls[0][1].toBe(1));
      expect(mockCalendar.mock.calls[0][2].toBe('token'));

      expect(mockFavourite.mock.calls).toHaveLength(0);
      expect(mockDoLater.mock.calls).toHaveLength(0);

      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toHaveLength(0);

      expect(mockSet.mock.calls).toHaveLength(1);
      expect(mockSet.mock.calls[0][0]).toHaveLength(true);
    });
  });
  test('UseTag favourite error works', async () => {
    mockFavourite.mockImplementation(() => Promise.reject());
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    await UseTag('favourite', 2, 1, null, 'token', mockLoading, mockSet);

    await waitFor(() => {
      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toHaveLength(4);
    });
  });
  test('UseTag doLater error works', async () => {
    mockDoLater.mockImplementation(() => Promise.reject());
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    await UseTag('doLater', 2, 1, null, 'token', mockLoading, mockSet);

    await waitFor(() => {
      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toHaveLength(4);
    });
  });
  test('UseTag toCalendar error works', async () => {
    mockCalendar.mockImplementation(() => Promise.reject());
    const mockLoading = jest.fn();
    const mockSet = jest.fn();

    await UseTag('toCalendar', 2, 1, null, 'token', mockLoading, mockSet);

    await waitFor(() => {
      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toHaveLength(4);
    });
  });
});
