import * as axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import { getAccountData } from '../../services/personService';
import { user } from '../testData/account.json';

const mockPost = jest.fn();

jest.mock('axios');

beforeEach(() => {
  axios.post.mockImplementation((url, config) => {
    mockPost(url, config);
    Promise.resolve(user);
  });
});

describe('person tests', () => {
  test('getAccountData calls correctly', async () => {
    const res = getAccountData(0, 'token');
    const config = {
      headers: { Authorization: 'Bearer token' },
    };

    await waitFor(() => {
      expect(res).toBe(user);

      expect(mockPost.mock.calls).toHaveLength(1);
      expect(mockPost.mock.calls[0][0]).toBe('URL');
      expect(mockPost.mock.calls[0][1]).toBe(config);
    });
  });
});
