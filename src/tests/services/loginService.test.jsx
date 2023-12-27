import * as axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import loginService from '../../services/loginService';

const mockPost = jest.fn();

jest.mock('axios');

beforeEach(() => {
  axios.post.mockImplementation((url, payload) => {
    mockPost(url, payload);
    return Promise.resolve({ data: { token: 'testToken', id: 'testId' } });
  });
});

describe('loginServiceTests', () => {
  test('login calls correctly', async () => {
    const payload = {
      username: 'username',
      password: 'password',
    };

    const res = await loginService.getAccount(payload);

    await waitFor(() => {
      expect(res.token).toBe('testToken');
      expect(res.id).toBe('testId');

      expect(mockPost.mock.calls).toHaveLength(1);
      expect(mockPost.mock.calls[0][0]).toBe('http://localhost:8080/account/login');
      expect(mockPost.mock.calls[0][1]).toBe(payload);
    });
  });

  test('crate calls correctly', async () => {
    const payload = {
      name: 'name',
      email: 'email',
      username: 'username',
      password: 'password',
    };

    const res = await loginService.createAccount(payload);

    await waitFor(() => {
      expect(res.token).toBe('testToken');
      expect(res.id).toBe('testId');

      expect(mockPost.mock.calls).toHaveLength(1);
      expect(mockPost.mock.calls[0][0]).toBe('http://localhost:8080/account/create');
      expect(mockPost.mock.calls[0][1]).toBe(payload);
    });
  });
});
