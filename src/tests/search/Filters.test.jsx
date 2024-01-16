import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Filters from '../../pages/search/Filters';

jest.mock('../../components/Filter');
jest.mock('../../components/Spinner');

describe('recipeButtons tests', () => {
  describe('render tests', () => {
    test('Filters renders successfully with ww > 600', async () => {
      const component = render(<Filters id="test" windowWidth={700} />);

      await waitFor(() => {
        const container = component.container.querySelector('#test');
        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(container.className).toBe('filters');
      });

      expect(component.getByText('sort')).toBeVisible();
      expect(component.getByRole('button', { name: 'time asc' })).toBeVisible();
      expect(component.getByText('ingredients')).toBeVisible();
      expect(component.getByRole('button', { name: 'pork' })).toBeVisible();
      expect(component.getByText('diet')).toBeVisible();
      expect(component.getByRole('button', { name: 'gluten free' })).toBeVisible();
      expect(component.getByText('intolerances')).toBeVisible();
      expect(component.getByRole('button', { name: 'dairy' })).toBeVisible();
      expect(component.getByText('type')).toBeVisible();
      expect(component.getByRole('button', { name: 'dessert' })).toBeVisible();
      expect(component.queryByRole('button', { name: 'apply' })).not.toBeInTheDocument();
      expect(component.queryByRole('button', { name: 'reset' })).not.toBeInTheDocument();
    });
    test('Filters renders successfully with ww < 600', async () => {
      const component = render(<Filters id="test" windowWidth={400} />);

      await waitFor(() => {
        const container = component.container.querySelector('#test');
        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(container.className).toBe('filters');
      });

      expect(component.getByText('open filters')).toBeVisible();
    });
  });
  describe('functions work', () => {
    test('apply works', async () => {
      const mockSearch = jest.fn();
      const mockApply = jest.fn();
      const component = render(<Filters id="test" windowWidth={700} selected={['filter']} searchResults={mockSearch} setFilter={mockApply} />);

      await waitFor(() => {
        const container = component.container.querySelector('#test');
        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(container.className).toBe('filters');
      });

      await userEvent.click(component.getByRole('button', { name: 'time asc' }));
      await userEvent.click(component.getByRole('button', { name: 'apply' }));

      expect(mockSearch.mock.calls).toHaveLength(1);
      expect(mockApply.mock.calls).toHaveLength(1);
    });
    test('reset works', async () => {
      const mockReset = jest.fn();
      const component = render(<Filters id="test" windowWidth={700} selected={['filter']} resetFilters={mockReset} />);

      await waitFor(() => {
        const container = component.container.querySelector('#test');
        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(container.className).toBe('filters');
      });

      await userEvent.click(component.getByRole('button', { name: 'reset' }));

      expect(mockReset.mock.calls).toHaveLength(1);
    });
    test('remove works', async () => {
      const mockRemove = jest.fn();
      const component = render(<Filters id="test" windowWidth={700} selected={['filter-test']} removeFilter={mockRemove} />);

      await waitFor(() => {
        const container = component.container.querySelector('#test');
        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(container.className).toBe('filters');
      });

      await userEvent.click(component.getByRole('button', { name: 'remove' }));

      expect(mockRemove.mock.calls).toHaveLength(1);
    });
    test('open filters < 600 works', async () => {
      const mockRemove = jest.fn();
      const component = render(<Filters id="test" windowWidth={500} selected={['filter-test']} removeFilter={mockRemove} />);

      await waitFor(() => {
        const container = component.container.querySelector('#test');
        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(container.className).toBe('filters');
      });
      expect(component.getByRole('button', { name: 'open filters' }));

      await userEvent.click(component.getByRole('button', { name: 'open filters' }));

      expect(component.getByRole('button', { name: 'close filters' }));

      await userEvent.click(component.getByRole('button', { name: 'close filters' }));

      expect(component.getByRole('button', { name: 'open filters' }));
    });
  });
});
