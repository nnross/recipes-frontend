/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Login from '../../pages/login/Login';
import { UseLogin, UseCreateAccount } from '../../pages/login/loginHooks';

jest.mock('../../pages/login/LoginForm');
jest.mock('../../pages/login/CreateNewForm');

const mockUseLogin = jest.fn();
const mockUseCreate = jest.fn();
jest.mock('../../pages/login/loginHooks', () => ({
  UseLogin: jest.fn(),
  UseCreateAccount: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();

  UseLogin.mockImplementation((username, password, setLoading, setError) => {
    mockUseLogin(username, password);
    setLoading(0);
  });

  UseCreateAccount.mockImplementation((
    name,
    email,
    username,
    password,
    confirm,
    setLoading,
    setError,
  ) => {
    mockUseCreate(name, email, username, password);
    setLoading(0);
  });
});

describe('login tests', () => {
  describe('login renders', () => {
    test('successful render works', () => {
      const component = render(<Login id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('login');

      expect(component.getByText('Login')).toBeVisible();
      expect(component.getByRole('button', { name: 'Log in' })).toBeVisible();

      expect(component.getByPlaceholderText('username')).toBeVisible();
      expect(component.getByPlaceholderText('password')).toBeVisible();

      expect(component.getByText('Don\'t have an account?')).toBeVisible();
      expect(component.getByRole('button', { name: 'Create new.' })).toBeVisible();

      expect(component.queryByText('Create account')).not.toBeInTheDocument();
    });
    test('view switch works', async () => {
      const component = render(<Login id="test" />);

      expect(component.queryByText('Create account')).not.toBeInTheDocument();

      await userEvent.click(component.getByRole('button', { name: 'Create new.' }));

      expect(component.queryByText('Login')).not.toBeInTheDocument();
      expect(component.getByText('Create account')).toBeVisible();

      expect(component.getByPlaceholderText('name')).toBeVisible();
      expect(component.getByPlaceholderText('e-mail')).toBeVisible();
      expect(component.getByPlaceholderText('username')).toBeVisible();
      expect(component.getByPlaceholderText('password')).toBeVisible();
      expect(component.getByPlaceholderText('confirm password')).toBeVisible();

      expect(component.getByText('Already have an account?')).toBeVisible();
      await userEvent.click(component.getByRole('button', { name: 'Log in.' }));

      expect(component.queryByText('Create account')).not.toBeInTheDocument();
      expect(component.getByText('Login')).toBeVisible();
    });
  });
  describe('functions work', () => {
    test('login works', async () => {
      const component = render(<Login id="test" />);

      await userEvent.type(component.getByPlaceholderText('username'), 'test name');
      await userEvent.type(component.getByPlaceholderText('password'), 'test pass');

      await userEvent.click(component.getByRole('button', { name: 'Log in' }));
      expect(mockUseLogin.mock.calls).toHaveLength(1);
      expect(mockUseLogin.mock.calls[0][0]).toBe('test name');
      expect(mockUseLogin.mock.calls[0][1]).toBe('test pass');
    });
    test('create new works', async () => {
      const component = render(<Login id="test" />);
      await userEvent.click(component.getByRole('button', { name: 'Create new.' }));

      await userEvent.type(component.getByPlaceholderText('name'), 'test name');
      await userEvent.type(component.getByPlaceholderText('username'), 'test username');
      await userEvent.type(component.getByPlaceholderText('e-mail'), 'test email');
      await userEvent.type(component.getByPlaceholderText('password'), 'test pass');
      await userEvent.type(component.getByPlaceholderText('confirm password'), 'test pass');

      await userEvent.click(component.getByRole('button', { name: 'Create account' }));
      expect(mockUseCreate.mock.calls).toHaveLength(1);
      expect(mockUseCreate.mock.calls[0][0]).toBe('test name');
      expect(mockUseCreate.mock.calls[0][1]).toBe('test email');
      expect(mockUseCreate.mock.calls[0][2]).toBe('test username');
      expect(mockUseCreate.mock.calls[0][3]).toBe('test pass');
    });
  });
});
