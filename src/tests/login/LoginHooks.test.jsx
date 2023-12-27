/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import { UseLogin, UseCreateAccount } from '../../pages/login/loginHooks';
import { getAccount, createAccount } from '../../services/loginService';

jest.mock('../../services/loginService', () => ({
  getAccount: jest.fn(),
  createAccount: jest.fn(),
}));

const mockLogin = jest.fn();
const mockCreate = jest.fn();

beforeEach(() => {
  getAccount.mockImplementation((payload) => {
    mockLogin(payload);
    return Promise.resolve({ token: 'testToken', accountId: 1 });
  });
  createAccount.mockImplementation((payload) => {
    mockCreate(payload);
    return Promise.resolve({ token: 'testToken', accountId: 1 });
  });
});

afterEach(() => {
  window.localStorage.clear();
});

describe('loginHooks tests', () => {
  test('UseLogin works', async () => {
    const mockLoad = jest.fn();
    const mockError = jest.fn();
    const mockClose = jest.fn();
    UseLogin('testUser', 'testPass', mockLoad, mockError, mockClose);

    await waitFor(() => {
      expect(window.localStorage.getItem('token')).toBe('testToken');
      expect(window.localStorage.getItem('accountId')).toBe('1');

      expect(mockLogin.mock.calls).toHaveLength(1);
      expect(mockLogin.mock.calls[0][0]).toStrictEqual({ username: 'testUser', password: 'testPass' });

      expect(mockLoad.mock.calls).toHaveLength(1);
      expect(mockLoad.mock.calls[0][0]).toBe(0);

      expect(mockError.mock.calls).toHaveLength(0);
      expect(mockClose.mock.calls).toHaveLength(1);
    });
  });

  test('UseCreateAccount works', async () => {
    const mockLoad = jest.fn();
    const mockError = jest.fn();
    const mockClose = jest.fn();
    UseCreateAccount('testName', 'testEmail', 'testUser', 'testPass', mockLoad, mockError, mockClose);

    await waitFor(() => {
      expect(window.localStorage.getItem('token')).toBe('testToken');
      expect(window.localStorage.getItem('accountId')).toBe('1');

      expect(mockCreate.mock.calls).toHaveLength(1);
      expect(mockCreate.mock.calls[0][0]).toStrictEqual({
        name: 'testName', email: 'testEmail', username: 'testUser', password: 'testPass',
      });

      expect(mockLoad.mock.calls).toHaveLength(1);
      expect(mockLoad.mock.calls[0][0]).toBe(0);

      expect(mockError.mock.calls).toHaveLength(0);
      expect(mockClose.mock.calls).toHaveLength(1);
    });
  });
  test('UseCreateAccount error works', async () => {
    createAccount.mockImplementation(() => Promise.reject());
    const mockLoad = jest.fn();
    const mockError = jest.fn();
    const mockClose = jest.fn();
    UseCreateAccount('testUser', 'testName', 'testEmail', 'testPass', mockLoad, mockError, mockClose);

    await waitFor(() => {
      expect(mockLoad.mock.calls).toHaveLength(1);
      expect(mockLoad.mock.calls[0][0]).toBe(4);

      expect(mockError.mock.calls).toHaveLength(1);
      expect(mockError.mock.calls[0][0]).toBe('An error has occurred');

      expect(mockClose.mock.calls).toHaveLength(0);
    });
  });
  test('UseLogin incorrect credentials works', async () => {
    getAccount.mockImplementation(() => {
      const error = new Error();
      error.response = { status: 403 };
      return Promise.reject(error);
    });
    const mockLoad = jest.fn();
    const mockError = jest.fn();
    const mockClose = jest.fn();
    UseLogin('testUser', 'testPass', mockLoad, mockError, mockClose);

    await waitFor(() => {
      expect(mockLoad.mock.calls).toHaveLength(1);
      expect(mockLoad.mock.calls[0][0]).toBe(4);

      expect(mockError.mock.calls).toHaveLength(1);
      expect(mockError.mock.calls[0][0]).toBe('Incorrect username or password');

      expect(mockClose.mock.calls).toHaveLength(0);
    });
  });
  test('UseLogin error works', async () => {
    getAccount.mockImplementation(() => {
      const error = new Error();
      error.response = { status: 404 };
      return Promise.reject(error);
    });
    const mockLoad = jest.fn();
    const mockError = jest.fn();
    const mockClose = jest.fn();
    UseLogin('testUser', 'testPass', mockLoad, mockError, mockClose);

    await waitFor(() => {
      expect(mockLoad.mock.calls).toHaveLength(1);
      expect(mockLoad.mock.calls[0][0]).toBe(4);

      expect(mockError.mock.calls).toHaveLength(1);
      expect(mockError.mock.calls[0][0]).toBe('An error has occurred');

      expect(mockClose.mock.calls).toHaveLength(0);
    });
  });
});
