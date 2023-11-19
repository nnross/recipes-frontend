import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Filters from '../../pages/search/Filters';

jest.mock('../../components/Filter');

describe('Search Filters tests', () => {
  describe('render tests', () => {
    test('render works succesfully', () => {
      const component = render(<Filters id="test" selected={['diet-vegan']} windowWidth={1000} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('filters');

      expect(component.getByText('sort')).toBeVisible();
      expect(component.getByText('ingredients')).toBeVisible();
      expect(component.getByText('intolerances')).toBeVisible();
      expect(component.getByText('diet')).toBeVisible();
      expect(component.getByText('cuisine')).toBeVisible();
      expect(component.getByText('type')).toBeVisible();
      expect(component.getByRole('button', { name: 'reset' })).toBeVisible();

      expect(component.getAllByText('vegan')).toHaveLength(2);
    });
    test('render rest invis when no selected succesfully', () => {
      const component = render(<Filters id="test" selected={[]} />);

      expect(component.getByText('reset')).not.toBeVisible();
    });
    test('render with smaller screen works succesfully', () => {
      const component = render(<Filters id="test" selected={['diet-vegan']} windowWidth={400} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('filters');

      expect(component.getByText('sort')).not.toBeVisible();
      expect(component.getByText('ingredients')).not.toBeVisible();
      expect(component.getByText('intolerances')).not.toBeVisible();
      expect(component.getByText('diet')).not.toBeVisible();
      expect(component.getByText('cuisine')).not.toBeVisible();
      expect(component.getByText('type')).not.toBeVisible();
      expect(component.getByRole('button', { name: 'reset' })).toBeVisible();

      expect(component.getByRole('button', { name: 'open filters' })).toBeVisible();

      expect(component.getAllByText('vegan')).toHaveLength(2);
    });
  });
  describe('Functionality tests', () => {
    test('Filters call when pressed and removal works', async () => {
      const mockOnFilter = jest.fn();
      const mockRemove = jest.fn();
      const mockReset = jest.fn();
      const component = render(<Filters id="test" removeFilter={mockRemove} resetFilters={mockReset} setFilter={mockOnFilter} windowWidth={1000} />);

      await userEvent.click(component.getByRole('button', { name: 'vegan' }));
      await userEvent.click(component.getByRole('button', { name: 'vegetarian' }));

      expect(mockOnFilter.mock.calls).toHaveLength(2);
      expect(mockOnFilter.mock.calls[0][0]).toBe('diet-vegan');
    });
    test('remove filter works', async () => {
      const mockRemove = jest.fn();
      const component = render(<Filters id="test" removeFilter={mockRemove} selected={['diet-vege']} />);

      await userEvent.click(component.getByRole('button', { name: 'remove' }));

      expect(mockRemove.mock.calls).toHaveLength(1);
    });
    test('reset filters works', async () => {
      const mockReset = jest.fn();

      const component = render(<Filters id="test" resetFilters={mockReset} selected={['diet-vegetarian']} />);

      await userEvent.click(component.getByRole('button', { name: 'reset' }));
      expect(mockReset.mock.calls).toHaveLength(1);
    });
    test('smaller screen open filters work', async () => {
      const component = render(<Filters id="test" selected={['diet-vegan']} windowWidth={400} />);

      await userEvent.click(component.getByRole('button', { name: 'open filters' }));

      expect(component.getByText('sort')).toBeVisible();
      expect(component.getByText('ingredients')).toBeVisible();
      expect(component.getByText('intolerances')).toBeVisible();
      expect(component.getByText('diet')).toBeVisible();
      expect(component.getByText('cuisine')).toBeVisible();
      expect(component.getByText('type')).toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'close filters' }));

      expect(component.getByText('sort')).not.toBeVisible();
      expect(component.getByText('ingredients')).not.toBeVisible();
      expect(component.getByText('intolerances')).not.toBeVisible();
      expect(component.getByText('diet')).not.toBeVisible();
      expect(component.getByText('cuisine')).not.toBeVisible();
      expect(component.getByText('type')).not.toBeVisible();
    });
  });
});
