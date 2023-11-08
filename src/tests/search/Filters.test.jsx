import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Filters from '../../pages/search/Filters';

jest.mock('../../components/Filter');

describe('Search Filters tests', () => {
  describe('render tests', () => {
    test('render works succesfully', () => {
      const component = render(<Filters id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('filters');

      // TODO correct filters render
      expect(false).toBeTruthy();
      expect(component.getByRole('button', { name: 'reset filters' })).toBeVisible();
    });
  });
  describe('Functionality tests', () => {
    test('Filters call when pressed and displays correct filters', async () => {
      const mockOnFilter = jest.fn();
      const component = render(<Filters id="test" onFilter={mockOnFilter} />);

      await userEvent.click(component.getByRole('button', { name: 'vegan' }));
      await userEvent.click(component.getByRole('button', { name: 'vegetarian' }));

      expect(component.getByText('vegan')).toBeVisible();
      expect(component.getByText('vegetarian')).toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'apply' }));

      expect(mockOnFilter.mock.calls).toHaveLength(1);
      expect(mockOnFilter.mock.calls[0][0]).toBe(['vegan', 'vegetarian']);

      await userEvent.click(component.getByRole('button', { name: 'vegetarian' }));

      expect(component.getByText('vegetarian')).not.toBeVisible();
      expect(component.getByText('vegan')).toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'apply' }));

      expect(mockOnFilter.mock.calls).toHaveLength(2);
      expect(mockOnFilter.mock.calls[1][0]).toBe(['vegan']);

      await userEvent.click(component.getByRole('button', { name: 'reset filters' }));

      expect(component.getByText('vegan')).not.toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'apply' }));

      expect(mockOnFilter.mock.calls).toHaveLength(3);
      expect(mockOnFilter.mock.calls[2][0]).toBe([]);
    });
  });
});
