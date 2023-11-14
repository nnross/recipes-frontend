import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Recipe from '../../pages/recipe/Recipe';

// TODO: mock hook calls and service calls

describe('Recipe tests', () => {
  describe('render tests', () => {
    test('render works succesfully', () => {
      const component = render(<Recipe id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('recipe');

      expect(component.getByText('recipe title')).toBeVisible();

      expect(component.getByText('vegan')).toBeVisible();

      expect(component.getByRole('button', { name: 'add to calender' })).toBeVisible();
      expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      expect(component.getByRole('button', { name: 'add to do later' })).toBeVisible();

      expect(component.getByRole('link', { name: 'original recipe' })).toHaveAttribute('href', 'TODO');
    });
    test('render fail works', () => {
      // TODO: fail call
      const component = render(<Recipe id="test" />);

      expect(component.getByText('an error occurred')).toBeVisible();
    });
    test('render load works', () => {
      // TODO: fail call
      const component = render(<Recipe id="test" />);

      const load = component.container.querySelector('#loading');
      expect(load).not.toBeNull();
      expect(load).toBeVisible();
    });
  });
  describe('Functionality tests', () => {
    test('favourite works', async () => {
      // TODO: mock hook call
      const component = render(<Recipe id="test" />);

      await userEvent.click(component.getByRole('button', { name: 'favourite' }));

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe('favourite');
      expect(mock.mock.calls[0][0]).toBe('TODO IDD');
    });
    test('do later works', async () => {
      // TODO: mock hook call
      const component = render(<Recipe id="test" />);

      await userEvent.click(component.getByRole('button', { name: 'do later' }));

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe('do later');
      expect(mock.mock.calls[0][0]).toBe('TODO IDD');
    });
    test('add to calender works', async () => {
      // TODO: mock hook call
      const component = render(<Recipe id="test" />);

      await userEvent.click(component.getByRole('button', { name: 'do later' }));
      await userEvent.select(selector); // TODO selector for calender

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe('add to calender');
      expect(mock.mock.calls[0][0]).toBe('date');
      expect(mock.mock.calls[0][0]).toBe('TODO IDD');
    });
  });
});
