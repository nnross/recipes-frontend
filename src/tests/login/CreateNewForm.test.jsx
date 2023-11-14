import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import CreateNewForm from '../../pages/login/CreateNewForm';

describe('CreateNewForm tests', () => {
  describe('CreateNewForm renders', () => {
    test('successful render works', () => {
      const component = render(<CreateNewForm id="test" open />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('createNew');

      expect(component.getByText('Create New')).toBeVisible();
      expect(component.getByRole('button', { name: 'Create' })).toBeVisible();

      expect(component.getByPlaceholder('name')).toBeVisible();
      expect(component.getByPlaceholder('username')).toBeVisible();
      expect(component.getByPlaceholder('email')).toBeVisible();
      expect(component.getByPlaceholder('password')).toBeVisible();
      expect(component.getByPlaceholder('confirm password')).toBeVisible();

      expect(component.getByText('already have an account?')).toBeVisible();
      expect(component.getByRole('button', { name: 'Login.' })).toBeVisible();

      expect(component.queryByText('Login')).not.toBeInTheDocument();
    });
    test('successful inividble render works', () => {
      const component = render(<CreateNewForm id="test" open={false} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).not.toBeVisible();
    });
  });
  describe('function calls work', () => {
    test('on login works', async () => {
      const mockLogin = jest.fn();
      const component = render(<CreateNewForm id="test" open onCreate={mockLogin} />);

      await userEvent.type(component.getByPlaceholder('username'), 'test username');
      await userEvent.type(component.getByPlaceholder('password'), 'test pass');
      await userEvent.type(component.getByPlaceholder('name'), 'test name');
      await userEvent.type(component.getByPlaceholder('email'), 'test email');
      await userEvent.type(component.getByPlaceholder('confirm pass'), 'test pass');

      await userEvent.click(component.getByRole('button', { name: 'Create new' }));

      expect(mockLogin.mock.calls).toHaveLength(1);
      expect(mockLogin.mock.calls[0][0]).toBe(['test name', 'test username', 'test email', 'test pass']);
    });
  });
});
