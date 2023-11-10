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
      addStyling(component);

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

      expect(component.getByRole('button', { name: 'log out', hidden: true })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'close', hidden: true })).not.toBeVisible();
      expect(component.getByRole('link', { name: 'search', hidden: true })).not.toBeVisible();
      expect(component.getByRole('link', { name: 'home', hidden: true })).not.toBeVisible();
      expect(component.getByRole('link', { name: 'personal', hidden: true })).not.toBeVisible();
      expect(component.getByRole('link', { name: 'today\'s recipe', hidden: true })).not.toBeVisible();
      expect(component.getByRole('link', { name: 'settings', hidden: true })).not.toBeVisible();

      expect(component.getByRole('link', { name: 'search', hidden: true })).toHaveAttribute('href', '/search');
      expect(component.getByRole('link', { name: 'home', hidden: true })).toHaveAttribute('href', '/home');
      expect(component.getByRole('link', { name: 'personal', hidden: true })).toHaveAttribute('href', '/personal');
      expect(component.getByRole('link', { name: 'today\'s recipe', hidden: true })).toHaveAttribute('href', '/today');
      expect(component.getByRole('link', { name: 'settings', hidden: true })).toHaveAttribute('href', '/settings');
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

      const logout = component.getByRole('button', { name: 'log out' });
      await userEvent.click(logout);

      expect(window.localStorage.getItem('token')).toBeNull();
      expect(window.localStorage.getItem('accountId')).toBeNull();
      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });
    test('nav bar opens and closes', async () => {
      const component = render(<Header id="test" />);
      addStyling(component);

      expect(component.getByRole('button', { name: 'log out', hidden: true })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'close', hidden: true })).not.toBeVisible();
      expect(component.getByRole('link', { name: 'home', hidden: true })).not.toBeVisible();
      expect(component.getByRole('link', { name: 'search', hidden: true })).not.toBeVisible();
      expect(component.getByRole('link', { name: 'personal', hidden: true })).not.toBeVisible();
      expect(component.getByRole('link', { name: 'today\'s recipe', hidden: true })).not.toBeVisible();
      expect(component.getByRole('link', { name: 'settings', hidden: true })).not.toBeVisible();

      const hamburger = component.container.querySelector('#test__nav__button');
      await userEvent.click(hamburger);

      expect(component.getByRole('link', { name: 'search', hidden: true })).toBeVisible();
      expect(component.getByRole('link', { name: 'home' })).toBeVisible();
      expect(component.getByRole('link', { name: 'personal' })).toBeVisible();
      expect(component.getByRole('link', { name: 'today\'s recipe' })).toBeVisible();
      expect(component.getByRole('link', { name: 'settings' })).toBeVisible();
      expect(component.getByRole('button', { name: 'log out' })).toBeVisible();
      expect(component.getByRole('button', { name: 'close' })).toBeVisible();

      const close = component.container.querySelector('#test__nav__sidebar__close');
      await userEvent.click(close);

      expect(component.getByRole('button', { name: 'log out', hidden: true })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'close', hidden: true })).not.toBeVisible();
      expect(component.getByRole('link', { name: 'home', hidden: true })).not.toBeVisible();
      expect(component.getByRole('link', { name: 'search', hidden: true })).not.toBeVisible();
      expect(component.getByRole('link', { name: 'personal', hidden: true })).not.toBeVisible();
      expect(component.getByRole('link', { name: 'today\'s recipe', hidden: true })).not.toBeVisible();
      expect(component.getByRole('link', { name: 'settings', hidden: true })).not.toBeVisible();
    });
  });
});
