import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Login from '../../pages/login/Login';

describe('login tests', () => {
  describe('login renders', () => {
    test('successful render works', () => {
      const component = (<Login id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('login');

      expect(component.getByText('Login')).toBeVisible();
      expect(component.getByRole('button', { name: 'Login' })).toBeVisible();

      expect(component.getByPlaceholder('username')).toBeVisible();
      expect(component.getByPlaceholder('password')).toBeVisible();

      expect(component.getByText('don\' have an account?')).toBeVisible();
      expect(component.getByRole('button', { name: 'Create new.' })).toBeVisible();

      expect(component.queryByText('Create account')).not.toBeInTheDocument();
    });
    test('view switch works', async () => {
      const component = (<Login id="test" />);

      expect(component.queryByText('Create account')).not.toBeInTheDocument();

      await userEvent.click(component.getByRole('button', { name: 'Create new.' }));

      expect(component.queryByText('Login')).not.toBeInTheDocument();
      expect(component.getByText('Create account')).toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'Login' }));

      expect(component.queryByText('Create account')).not.toBeInTheDocument();
      expect(component.getByText('Login')).toBeVisible();
    });
  });
  describe('functions work', () => {
    test('login works', async () => {
      // mock the hook call
      const component = (<Login id="test" />);

      await userEvent.type(component.getByPlaceholder('username'), 'test name');
      await userEvent.type(component.getByPlaceholder('password'), 'test pass');

      await userEvent.click(component.getByRole('button', { name: 'Login' }));
      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe('test name');
      expect(mock.mock.calls[0][1]).toBe('test pass');
    });
    test('create new works', async () => {
      // mock the hook call
      const component = (<Login id="test" />);
      await userEvent.click(component.getByRole('button', { name: 'Create new.' }));

      await userEvent.type(component.getByPlaceholder('name'), 'test name');
      await userEvent.type(component.getByPlaceholder('username'), 'test username');
      await userEvent.type(component.getByPlaceholder('email'), 'test email');
      await userEvent.type(component.getByPlaceholder('password'), 'test pass');
      await userEvent.type(component.getByPlaceholder('confirm password'), 'test pass');

      await userEvent.click(component.getByRole('button', { name: 'Create' }));
      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe('test name');
      expect(mock.mock.calls[0][1]).toBe('test username');
      expect(mock.mock.calls[0][2]).toBe('test email');
      expect(mock.mock.calls[0][3]).toBe('test pass');
    });
    test('error when not same passwords', async () => {
      const component = (<Login id="test" />);
      await userEvent.click(component.getByRole('button', { name: 'Create new.' }));

      await userEvent.type(component.getByPlaceholder('password'), 'test pass');
      await userEvent.type(component.getByPlaceholder('confirm password'), 'test password');

      expect(component.getByText('passwords don\'t match')).toBeVisible();
    });
    test('error when password is not valid', async () => {
      const component = (<Login id="test" />);
      await userEvent.click(component.getByRole('button', { name: 'Create new.' }));

      await userEvent.type(component.getByPlaceholder('password'), 'pass');

      expect(component.getByText('password is not valid')).toBeVisible();
    });
    test('error when username is not valid', async () => {
      const component = (<Login id="test" />);
      await userEvent.click(component.getByRole('button', { name: 'Create new.' }));

      await userEvent.type(component.getByPlaceholder('username'), 'a');

      expect(component.getByText('username is not valid')).toBeVisible();
    });
  });
});
