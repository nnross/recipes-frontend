import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Home from '../../pages/home/Home';

const mockedUseNavigate = jest.fn();
// mocks the useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Home tests', () => {
  describe('render tests', () => {
    test('homepage renders correctly on desktop', () => {
      const component = render(<Home id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('home');

      expect(component.getByText('Find')).toBeVisible();
      expect(component.getByText('new recipes')).toBeVisible();
      expect(component.getByText('easily')).toBeVisible();

      expect(component.getByText('Discover new recipews and save them to your account by creating one! RecipeBuddy offers many exciting features for you to try, like a calender for all the recipes yout wanna do this week!')).toBeVisible();

      // not sure how an image is tested. Fix this later.
      expect(component.getByAltText('home image')).toBeVisible();
      const shadow = component.container.querySelector('"test__image__shadow');
      expect(shadow).not.toBeNull();
      expect(shadow).toBeVisible();

      expect(component.getByRole('button', { name: 'search for recipes' })).toBeVisible();
    });

    test('homepage renders correctly on mobile', () => {
      // mobile screen
      window.innerWidth = 500;
      window.dispatchEvent(new Event('resize'));

      const component = render(<Home id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('home');

      expect(component.getByText('Find')).toBeVisible();
      expect(component.getByText('new recipes')).toBeVisible();
      expect(component.getByText('easily')).toBeVisible();

      expect(component.getByText('Discover new recipews and save them to your account by creating one! RecipeBuddy offers many exciting features for you to try, like a calender for all the recipes yout wanna do this week!')).toBeVisible();

      // not sure how an image is tested. Fix this later.
      expect(component.getByAltText('home image')).toBeVisible();
      const shadow = component.container.querySelector('"test__image__shadow');
      expect(shadow).not.toBeNull();
      expect(shadow).toBeVisible();

      const blob = component.container.querySelector('"test__image__blob');
      expect(blob).not.toBeNull();
      expect(blob).toBeVisible();

      expect(component.getByRole('button', { name: 'search for recipes' }));
    });
  });
  describe('functions work', () => {
    test('search button works', async () => {
      const component = render(<Home id="test" />);

      const button = component.getByRole('button', { name: 'search for recipes' });
      await userEvent.click(button);

      expect(mockedUseNavigate.mock.calls).toHaveLength(1);
    });
  });
});
