import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import CreateNewForm from '../../pages/login/CreateNewForm';

describe('CreateNewForm tests', () => {
  describe('CreateNewForm renders', () => {
    test('successful render works', () => {
      const component = render(<CreateNewForm id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('createNewForm');

      expect(component.getByText('Create new')).toBeVisible();
      expect(component.getByRole('button', { name: 'Create account' })).toBeVisible();

      expect(component.getByPlaceholderText('name')).toBeVisible();
      expect(component.getByPlaceholderText('username')).toBeVisible();
      expect(component.getByPlaceholderText('e-mail')).toBeVisible();
      expect(component.getByPlaceholderText('password')).toBeVisible();
      expect(component.getByPlaceholderText('confirm password')).toBeVisible();

      expect(component.getByText('Already have an account?')).toBeVisible();
      expect(component.getByRole('button', { name: 'Log in.' })).toBeVisible();

      expect(component.queryByText('Login')).not.toBeInTheDocument();
      expect(component.getByRole('button', { name: 'Create account' })).toBeDisabled();
    });
    test('loading renders', () => {
      const component = render(<CreateNewForm id="test" loading={2} />);

      expect(component.getByText('loading')).toBeVisible();
    });
  });
  describe('function calls work', () => {
    test('on create works', async () => {
      const mockCreate = jest.fn((e) => {
        e.preventDefault();
        expect(e.target.elements[0].value).toBe('test name');
        expect(e.target.elements[1].value).toBe('test email');
        expect(e.target.elements[2].value).toBe('test username');
        expect(e.target.elements[3].value).toBe('testPass123!');
      });
      const component = render(<CreateNewForm id="test" handleCreate={mockCreate} />);

      await userEvent.type(component.getByPlaceholderText('username'), 'test username');
      await userEvent.type(component.getByPlaceholderText('password'), 'testPass123!');
      await userEvent.type(component.getByPlaceholderText('name'), 'test name');
      await userEvent.type(component.getByPlaceholderText('e-mail'), 'test email');
      await userEvent.type(component.getByPlaceholderText('confirm password'), 'testPass123!');

      await userEvent.click(component.getByRole('button', { name: 'Create account' }));

      expect(mockCreate.mock.calls).toHaveLength(1);
    });
    test('error when not same passwords', async () => {
      const component = render(<CreateNewForm id="test" />);

      await userEvent.type(component.getByPlaceholderText('password'), 'test pass');
      await userEvent.type(component.getByPlaceholderText('confirm password'), 'test password');

      expect(component.getByRole('button', { name: 'Create account' })).toBeDisabled();
      expect(component.getByText('passwords do not match')).toBeVisible();
    });
    test('error when password is not valid', async () => {
      const component = render(<CreateNewForm id="test" />);

      await userEvent.type(component.getByPlaceholderText('password'), 'pass');

      expect(component.getByRole('button', { name: 'Create account' })).toBeDisabled();
      expect(component.getByText('password must include the following:')).toBeVisible();
    });
    test('error when username is not valid', async () => {
      const component = render(<CreateNewForm id="test" />);

      await userEvent.type(component.getByPlaceholderText('username'), 'a');

      expect(component.getByRole('button', { name: 'Create account' })).toBeDisabled();
      expect(component.getByText('username needs to be atleast 4 characters long')).toBeVisible();
    });
  });
});
