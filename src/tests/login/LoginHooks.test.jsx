/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import { UseLogin, UseCreateAccount } from '../../pages/login/loginHooks';
import { getAccount, createAccount } from '../../services/loginService';

jest.mock('../../../services/loginService', () => ({
  getAccount: jest.fn(),
  createAccount: jest.fn(),
}));

beforeEach(() => {
  getAccount.mockImplementation(() => Promise.resolve({ token: 'testToken', accountId: 1 }));
  createAccount.mockImplementation(() => Promise.resolve({ token: 'testToken', accountId: 1 }));
});

afterEach(() => {
  window.localStorage.clear();
});

describe('loginHooks tests', () => {
  test('UseLogin works', async () => {
    const mockLoad = jest.fn();
    const mockError = jest.fn();
    const token = await UseLogin('testUser', 'testPass', mockLoad, mockError);

    await waitFor(() => {
      expect(window.localStorage.getItem('token')).toBe('testToken');
      expect(window.localStorage.getItem('accountId')).toBe('1');
      expect(token).toBe('testToken');

      expect(mockLoad.mock.calls).toHaveLength(1);
      expect(mockLoad.mock.calls[0][0]).toBe(0);

      expect(mockError.mock.calls).toHaveLength(0);
    });
  });
  test('UseCreateAccount works', async () => {
    const mockLoad = jest.fn();
    const mockError = jest.fn();
    const token = await UseCreateAccount('testUser', 'testName', 'testEmail', 'testPass', '1', mockLoad, mockError);

    await waitFor(() => {
      expect(window.localStorage.getItem('token')).toBe('testToken');
      expect(window.localStorage.getItem('accountId')).toBe('1');
      expect(token).toBe('testToken');

      expect(mockLoad.mock.calls).toHaveLength(1);
      expect(mockLoad.mock.calls[0][0]).toBe(0);

      expect(mockError.mock.calls).toHaveLength(0);
    });
  });
  test('UseCreateAccount error works', async () => {
    createAccount.mockImplementation(() => Promise.reject());
    const mockLoad = jest.fn();
    const mockError = jest.fn();
    await UseCreateAccount('testUser', 'testName', 'testEmail', 'testPass', '1', mockLoad, mockError);

    await waitFor(() => {
      expect(mockLoad.mock.calls).toHaveLength(1);
      expect(mockLoad.mock.calls[0][0]).toBe(4);

      expect(mockError.mock.calls).toHaveLength(0);
      expect(mockError.mock.calls[0][1]).toBe('an error has occurred');
    });
  });
  test('UseLogin incorrect credentials works', async () => {
    getAccount.mockImplementation(() => {
      const error = new Error();
      error.response = { status: 403 };
      throw error;
    });
    const mockLoad = jest.fn();
    const mockError = jest.fn();
    await UseCreateAccount('testUser', 'testName', 'testEmail', 'testPass', '1', mockLoad, mockError);

    await waitFor(() => {
      expect(mockLoad.mock.calls).toHaveLength(1);
      expect(mockLoad.mock.calls[0][0]).toBe(4);

      expect(mockError.mock.calls).toHaveLength(0);
      expect(mockError.mock.calls[0][1]).toBe('Incorrect username or password');
    });
  });
  test('UseLogin error works', async () => {
    getAccount.mockImplementation(() => {
      const error = new Error();
      error.response = { status: 404 };
      throw error;
    });
    const mockLoad = jest.fn();
    const mockError = jest.fn();
    await UseCreateAccount('testUser', 'testName', 'testEmail', 'testPass', '1', mockLoad, mockError);

    await waitFor(() => {
      expect(mockLoad.mock.calls).toHaveLength(1);
      expect(mockLoad.mock.calls[0][0]).toBe(4);

      expect(mockError.mock.calls).toHaveLength(0);
      expect(mockError.mock.calls[0][1]).toBe('An error has occurred');
    });
  });
});
