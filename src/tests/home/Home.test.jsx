import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import React from 'react';
import Home from '../../pages/home/Home';

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

      expect(component.getByText('Discover new recipes and save them to your account by creating one! RecipeBuddy offers many exciting features for you to try, like a calendar for all the recipes you wanna do this week!')).toBeVisible();

      expect(component.getByAltText('soup')).toBeVisible();

      expect(component.getByRole('link', { name: 'SEARCH FOR RECIPES' })).toBeVisible();
      expect(component.getByRole('link', { name: 'SEARCH FOR RECIPES' })).toHaveAttribute('href', '/search');
    });
  });
});
