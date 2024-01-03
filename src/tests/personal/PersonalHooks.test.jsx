/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import { UseGetItems } from '../../pages/personal/personalHooks';
import { withMore } from '../testData/itemList.json';
import { getFavourite, getDoLater } from '../../services/recipeService';

const mockFavourite = jest.fn();
const mockDoLater = jest.fn();
jest.mock('../../services/recipeService', () => ({
  getFavourite: jest.fn(),
  getDoLater: jest.fn(),
}));

beforeEach(() => {
  getFavourite.mockImplementation((id, token, page) => {
    mockFavourite(id, token, page);
    return Promise.resolve(withMore);
  });

  getDoLater.mockImplementation((id, token, page) => {
    mockDoLater(id, token, page);
    return Promise.resolve(withMore);
  });

  jest.clearAllMocks();
});

describe('personalHooks tests', () => {
  test('UseGetItems favourite works', async () => {
    const mockSet = jest.fn();
    const mockNext = jest.fn();
    const mockLoading = jest.fn();
    UseGetItems(1, 'token', 'favourite', 0, mockSet, mockNext, mockLoading);

    await waitFor(() => {
      expect(mockFavourite.mock.calls).toHaveLength(1);
      expect(mockFavourite.mock.calls[0][0]).toBe(1);
      expect(mockFavourite.mock.calls[0][1]).toBe('token');

      expect(mockDoLater.mock.calls).toHaveLength(0);

      expect(mockSet.mock.calls).toHaveLength(1);
      expect(mockSet.mock.calls[0][0]).toBe(withMore.recipes);

      expect(mockNext.mock.calls).toHaveLength(1);
      expect(mockNext.mock.calls[0][0]).toBe(withMore.nextPage);

      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(0);
    });
  });

  test('UseGetItems doLater works', async () => {
    const mockSet = jest.fn();
    const mockNext = jest.fn();
    const mockLoading = jest.fn();
    UseGetItems(1, 'token', 'doLater', 0, mockSet, mockNext, mockLoading);

    await waitFor(() => {
      expect(mockDoLater.mock.calls).toHaveLength(1);
      expect(mockDoLater.mock.calls[0][0]).toBe(1);
      expect(mockDoLater.mock.calls[0][1]).toBe('token');

      expect(mockFavourite.mock.calls).toHaveLength(0);

      expect(mockSet.mock.calls).toHaveLength(1);
      expect(mockSet.mock.calls[0][0]).toBe(withMore.recipes);

      expect(mockNext.mock.calls).toHaveLength(1);
      expect(mockNext.mock.calls[0][0]).toBe(withMore.nextPage);

      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(0);
    });
  });

  test('UseGetFavourite favourite reject works', async () => {
    getFavourite.mockImplementation(() => Promise.reject());

    const mockSet = jest.fn();
    const mockNext = jest.fn();
    const mockLoading = jest.fn();
    await UseGetItems(1, 'token', 'favourite', 0, mockSet, mockNext, mockLoading);

    await waitFor(() => {
      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(4);
    });
  });

  test('UseGetItems doLater reject works', async () => {
    getDoLater.mockImplementation(() => Promise.reject());

    const mockSet = jest.fn();
    const mockNext = jest.fn();
    const mockLoading = jest.fn();
    await UseGetItems(1, 'token', 'doLater', 0, mockSet, mockNext, mockLoading);

    await waitFor(() => {
      expect(mockLoading.mock.calls).toHaveLength(1);
      expect(mockLoading.mock.calls[0][0]).toBe(4);
    });
  });
});
