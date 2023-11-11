import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Header from '../../components/Header';
import { addStyling } from '../testHelpers';

describe('header tests', () => {
  describe('render tests', () => {
    test('nav bar renders succesfully when logged out', () => {
      const component = render(<Header id="test" loggedIn={false} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('header');

      expect(component.getByRole('button', { name: 'Log in' })).toBeVisible();
      expect(component.getByText('RecipeBuddy')).toBeVisible();

      const hamburger = component.container.querySelector('#test__nav__button');
      expect(hamburger).not.toBeNull();
      expect(hamburger).toBeVisible();

      const hamburgerIcon = component.container.querySelector('#test__nav__button');
      expect(hamburgerIcon).not.toBeNull();
      expect(hamburgerIcon).toBeVisible();
    });
    test('nav bar renders succesfully when logged in', () => {
      const component = render(<Header id="test" loggedIn />);

      expect(component.queryByRole('button', { name: 'log in' })).not.toBeInTheDocument();
    });
  });
  describe('functionality works', () => {
    test('login button works', async () => {
      const mockOpen = jest.fn();
      const component = render(<Header id="test" openLogin={mockOpen} />);

      const login = component.getByRole('button', { name: 'Log in' });
      await userEvent.click(login);

      expect(mockOpen.mock.calls).toHaveLength(1);
    });
    test('logout button works', async () => {
      window.localStorage.setItem('token', 'testToken');
      window.localStorage.setItem('accountId', 'testId');
      // mock window.location.reload();
      Object.defineProperty(window, 'location', {
        configurable: true,
        value: { reload: jest.fn() },
      });
      const component = render(<Header id="test" loggedIn />);

      const hamburger = component.container.querySelector('#test__nav__button');
      await userEvent.click(hamburger);

      const logout = component.getByRole('button', { name: 'log out' });
      await userEvent.click(logout);

      expect(window.localStorage.getItem('token')).toBeNull();
      expect(window.localStorage.getItem('accountId')).toBeNull();
      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });
    test('nav bar opens and closes', async () => {
      const component = render(<Header id="test" />);

      const hamburger = component.container.querySelector('#test__nav__button');
      await userEvent.click(hamburger);

      expect(component.getByRole('link', { name: 'search' })).toBeVisible();
      expect(component.getByRole('link', { name: 'home' })).toBeVisible();
      expect(component.getByRole('link', { name: 'personal' })).toBeVisible();
      expect(component.getByRole('link', { name: 'today\'s recipe' })).toBeVisible();
      expect(component.getByRole('link', { name: 'settings' })).toBeVisible();
      expect(component.getByRole('button', { name: 'log out' })).toBeVisible();
      expect(component.getByRole('button', { name: 'close' })).toBeVisible();

      expect(component.getByRole('link', { name: 'search' })).toHaveAttribute('href', '/search');
      expect(component.getByRole('link', { name: 'home' })).toHaveAttribute('href', '/home');
      expect(component.getByRole('link', { name: 'personal' })).toHaveAttribute('href', '/personal');
      expect(component.getByRole('link', { name: 'today\'s recipe' })).toHaveAttribute('href', '/today');
      expect(component.getByRole('link', { name: 'settings' })).toHaveAttribute('href', '/settings');

      const close = component.container.querySelector('#test__nav__sidebar__close');
      await userEvent.click(close);

      expect(component.queryByRole('link', { name: 'search' })).not.toBeInTheDocument();
      expect(component.queryByRole('link', { name: 'home' })).not.toBeInTheDocument();
      expect(component.queryByRole('link', { name: 'personal' })).not.toBeInTheDocument();
      expect(component.queryByRole('link', { name: 'today\'s recipe' })).not.toBeInTheDocument();
      expect(component.queryByRole('link', { name: 'settings' })).not.toBeInTheDocument();
      expect(component.queryByRole('button', { name: 'log out' })).not.toBeInTheDocument();
      expect(component.queryByRole('button', { name: 'close' })).not.toBeInTheDocument();
    });
  });
});
