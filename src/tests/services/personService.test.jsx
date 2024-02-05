import * as axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import personService from '../../services/personService';
import { user } from '../testData/account.json';

const mockPost = jest.fn();

jest.mock('axios');

beforeEach(() => {
  jest.clearAllMocks();
  axios.get.mockImplementation((url, config) => {
    mockPost(url, config);
    return Promise.resolve({ data: user });
  });

  axios.put.mockImplementation((url, payload, config) => {
    mockPost(url, payload, config);
    return Promise.resolve({ data: true });
  });

  axios.delete.mockImplementation((url, config) => {
    mockPost(url, config);
    return Promise.resolve({ data: true });
  });
});

describe('person tests', () => {
  test('getAccountData calls correctly', async () => {
    const res = await personService.getAccountData(0, 'token');
    const config = {
      headers: { Authorization: 'Bearer token' },
    };

    await waitFor(() => {
      expect(res).toBe(user);

      expect(mockPost.mock.calls).toHaveLength(1);
      expect(mockPost.mock.calls[0][0]).toBe('https://recipes-backend-wxel.onrender.com/account/get?accountId=0');
      expect(mockPost.mock.calls[0][1]).toStrictEqual(config);
    });
  });

  test('postAccountData calls correctly', async () => {
    const payload = {
      test: 'testing',
    };
    const res = await personService.postAccountData(0, 'token', payload);
    const config = {
      headers: { Authorization: 'Bearer token' },
    };

    await waitFor(() => {
      expect(res).toBe(true);

      expect(mockPost.mock.calls).toHaveLength(1);
      expect(mockPost.mock.calls[0][0]).toBe('https://recipes-backend-wxel.onrender.com/account/update?accountId=0');
      expect(mockPost.mock.calls[0][2]).toStrictEqual(config);
      expect(mockPost.mock.calls[0][1]).toStrictEqual(payload);
    });
  });

  test('deleteAccountData calls correctly', async () => {
    const res = await personService.deleteAccountData(0, 'token');
    const config = {
      headers: { Authorization: 'Bearer token' },
    };

    await waitFor(() => {
      expect(res).toBe(true);

      expect(mockPost.mock.calls).toHaveLength(1);
      expect(mockPost.mock.calls[0][0]).toBe('https://recipes-backend-wxel.onrender.com/account/delete?accountId=0');
      expect(mockPost.mock.calls[0][1]).toStrictEqual(config);
    });
  });
});
