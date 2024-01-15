import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import LoginForm from '../../pages/login/LoginForm';

jest.mock('../../components/Spinner');

describe('loginForm tests', () => {
  describe('loginForm renders', () => {
    test('successful render works', () => {
      const component = render(<LoginForm id="test" open />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('loginForm');

      expect(component.getByText('Login')).toBeVisible();
      expect(component.getByRole('button', { name: 'Log in' })).toBeVisible();

      expect(component.getByPlaceholderText('username')).toBeVisible();
      expect(component.getByPlaceholderText('password')).toBeVisible();

      expect(component.getByText('Don\'t have an account?')).toBeVisible();
      expect(component.getByRole('button', { name: 'Create new.' })).toBeVisible();

      expect(component.queryByText('Create account')).not.toBeInTheDocument();
    });
    test('on loading works', () => {
      const component = render(<LoginForm id="test" loading={2} />);

      expect(component.getByText('loading')).toBeVisible();
    });
    test('custom error works', () => {
      const component = render(<LoginForm id="test" error="new error" />);

      expect(component.getByText('new error')).toBeVisible();
    });
  });
  describe('function calls work', () => {
    test('on login works', async () => {
      const mockLogin = jest.fn((e) => {
        e.preventDefault();
        expect(e.target.elements[0].value).toBe('test name');
        expect(e.target.elements[1].value).toBe('test pass');
      });
      const component = render(<LoginForm id="test" open handleLogin={mockLogin} />);

      await userEvent.type(component.getByPlaceholderText('username'), 'test name');
      await userEvent.type(component.getByPlaceholderText('password'), 'test pass');

      await userEvent.click(component.getByRole('button', { name: 'Log in' }));

      expect(mockLogin.mock.calls).toHaveLength(1);
    });
    test('on switch works', async () => {
      const mockSwitch = jest.fn();
      const component = render(<LoginForm id="test" open switchView={mockSwitch} />);

      await userEvent.click(component.getByRole('button', { name: 'Create new.' }));

      expect(mockSwitch.mock.calls).toHaveLength(1);
    });
  });
});
