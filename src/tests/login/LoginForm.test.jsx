import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import LoginForm from '../../pages/login/LoginForm';

describe('loginForm tests', () => {
  describe('loginForm renders', () => {
    test('successful render works', () => {
      const component = render(<LoginForm id="test" open />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('loginForm');

      expect(component.getByText('Login')).toBeVisible();
      expect(component.getByRole('button', { name: 'Login' })).toBeVisible();

      expect(component.getByPlaceholder('username')).toBeVisible();
      expect(component.getByPlaceholder('password')).toBeVisible();

      expect(component.getByText('don\' have an account?')).toBeVisible();
      expect(component.getByRole('button', { name: 'Create new.' })).toBeVisible();

      expect(component.queryByText('Create account')).not.toBeInTheDocument();
    });
    test('successful inividble render works', () => {
      const component = render(<LoginForm id="test" open={false} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).not.toBeVisible();
    });
  });
  describe('function calls work', () => {
    test('on login works', async () => {
      const mockLogin = jest.fn();
      const component = render(<LoginForm id="test" open onLogin={mockLogin} />);

      await userEvent.type(component.getByPlaceholder('username'), 'test name');
      await userEvent.type(component.getByPlaceholder('password'), 'test pass');

      await userEvent.click(component.getByRole('button', { name: 'Login' }));

      expect(mockLogin.mock.calls).toHaveLength(1);
      expect(mockLogin.mock.calls[0][0]).toBe(['test name', 'test password']);
    });
  });
});
