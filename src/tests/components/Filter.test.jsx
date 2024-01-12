import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import Filter from '../../components/Filter';
import { fireEvent } from '@testing-library/dom';

const getBoundingClientRectMock = jest.fn(() => ({
  x: 100, y: 100, width: 100, height: 100,
}));

global.document.getElementById = jest.fn(() => ({
  getBoundingClientRect: getBoundingClientRectMock,
}));

describe('Filter tests', () => {
  describe('Filter renders', () => {
    test('Filter render correctly', () => {
      const component = render(<Filter id="test" title="testName" filters={['filter1', 'filter2']} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('filter');

      expect(component.getByRole('button', { name: 'testName' })).toBeVisible();

      expect(component.queryByRole('button', { name: 'filter1' })).not.toBeInTheDocument();
      expect(component.queryByRole('button', { name: 'filter2' })).not.toBeInTheDocument();
    });
  });
  describe('Filter functions work', () => {
    test('open filter and select sort works', async () => {
      const mockOnFilter = jest.fn();
      const component = render(<Filter id="test" selectFilter={mockOnFilter} title="testName" filters={['filter1', 'filter2']} />);

      const button = component.getByRole('button', { name: 'testName' });
      expect(component.queryByRole('button', { name: 'filter1' })).not.toBeInTheDocument();
      expect(component.queryByRole('button', { name: 'filter2' })).not.toBeInTheDocument();

      await userEvent.click(button);

      expect(component.getByRole('button', { name: 'filter1' })).toBeVisible();
      expect(component.getByRole('button', { name: 'filter2' })).toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'filter1' }));

      expect(mockOnFilter.mock.calls).toHaveLength(1);
      expect(mockOnFilter.mock.calls[0][0]).toBe('testName-filter1');

      await userEvent.click(button);

      expect(component.queryByRole('button', { name: 'filter1' })).not.toBeInTheDocument();
      expect(component.queryByRole('button', { name: 'filter2' })).not.toBeInTheDocument();
    });
    test('filter closes when pressed outside', async () => {
      const mockOnFilter = jest.fn();
      const component = render(<Filter id="test" selectFilter={mockOnFilter} title="testName" filters={['filter1', 'filter2']} />);

      const button = component.getByRole('button', { name: 'testName' });
      expect(component.queryByRole('button', { name: 'filter1' })).not.toBeInTheDocument();
      expect(component.queryByRole('button', { name: 'filter2' })).not.toBeInTheDocument();

      await userEvent.click(button);

      expect(component.getByRole('button', { name: 'filter1' })).toBeVisible();
      expect(component.getByRole('button', { name: 'filter2' })).toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'filter2' }));

      expect(component.queryByRole('button', { name: 'filter1' })).toBeInTheDocument();
      expect(component.queryByRole('button', { name: 'filter2' })).toBeInTheDocument();

      fireEvent.click(button, {
        clientX: 40,
        clientY: 0,
      });

      expect(component.queryByRole('button', { name: 'filter1' })).not.toBeInTheDocument();
      expect(component.queryByRole('button', { name: 'filter2' })).not.toBeInTheDocument();
    });
  });
});
