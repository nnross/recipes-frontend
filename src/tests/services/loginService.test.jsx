import * as axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import { getAccount, createAccount } from '../../services/loginService';

const mockPost = jest.fn();

jest.mock('axios');

beforeEach(() => {
  axios.post.mockImplementation((url, config) => {
    mockPost(url, config);
    Promise.resolve({ token: 'testToken', id: 'testId' });
  });
});

describe('loginServiceTests', () => {
  test('login calls correctly', async () => {
    const res = getAccount('username', 'password');
    const payload = {
      username: 'username',
      password: 'password',
    };

    await waitFor(() => {
      expect(res.token).toBe('testToken');
      expect(res.id).toBe('testId');

      expect(mockPost.mock.calls).toHaveLength(1);
      expect(mockPost.mock.calls[0][0]).toBe('URL');
      expect(mockPost.mock.calls[0][1]).toBe(payload);
    });
  });

  test('crate calls correctly', async () => {
    const res = createAccount('name', 'email', 'username', 'password');
    const payload = {
      name: 'name',
      email: 'email',
      username: 'username',
      password: 'password',
    };

    await waitFor(() => {
      expect(res.token).toBe('testToken');
      expect(res.id).toBe('testId');

      expect(mockPost.mock.calls).toHaveLength(1);
      expect(mockPost.mock.calls[0][0]).toBe('URL');
      expect(mockPost.mock.calls[0][1]).toBe(payload);
    });
  });
});
