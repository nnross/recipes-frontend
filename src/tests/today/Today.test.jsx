import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Today from '../../pages/today/Today';

describe('todays recipe page tests', () => {
  describe('Render tests', () => {
    test('todays recipe page renders correctly', () => {
      const component = render(<Today id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('today');

      expect(component.getByRole('button', { name: 'M' })).toBeVisible();
      expect(component.getByRole('button', { name: 'T' })).toBeVisible();
      expect(component.getByRole('button', { name: 'W' })).toBeVisible();
      expect(component.getByRole('button', { name: 'T' })).toBeVisible();
      expect(component.getByRole('button', { name: 'F' })).toBeVisible();
      expect(component.getByRole('button', { name: 'S' })).toBeVisible();
      expect(component.getByRole('button', { name: 'S' })).toBeVisible();

      expect(component.getByText('test title')).toBeVisible();
      expect(component.getByText('Ingredients')).toBeVisible();
      expect(component.getByText('test ingredients')).toBeVisible();
      expect(component.getByText('Instructions')).toBeVisible();
      expect(component.getByText('test instructions')).toBeVisible();
      expect(component.getByText('test date')).toBeVisible();
      expect(component.getByText('test time')).toBeVisible();
      expect(component.getByText('test servings')).toBeVisible();
      expect(component.getByText('test nutrients')).toBeVisible();

      expect(component.getByAltText('test pic')).toBeVisible();

      expect(component.getByRole('link', { name: 'original recipe' })).toHaveAttribute('href', 'test src');
      expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      expect(component.getByRole('button', { name: 'finished' })).toBeVisible();
    });
  });
  describe('Functionality tests', () => {
    test('finished button works', async () => {
      const component = render(<Today id="test" />);

      const finished = component.getByRole('button', { name: 'finished' });
      await userEvent.click(finished);

      expect(component.getByRole('button', { name: 'finished' })).not.toBeVisible();

      // test for calendar circle change?
    });
    test('favourite button works', async () => {
      const component = render(<Today id="test" />);

      const favourite = component.getByRole('button', { name: 'favourite' });
      await userEvent.click(favourite);

      expect(component.getByRole('button', { name: 'favourite' })).not.toBeVisible();

      // test for favourite adding?
    });
  });
});
