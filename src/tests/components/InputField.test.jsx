import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import InputField from '../../components/InputField';

describe('InputField tests', () => {
  describe('InputField renders', () => {
    test('InputField renders correctly', () => {
      const component = render(<InputField id="test" placeholder="testLabel" width="200px" height="40px" fontSize="20px" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('inputField');

      expect(component.getByRole('button', { name: 'Submit' })).toBeVisible();
      expect(component.getByPlaceholderText('testLabel')).toBeVisible();

      const input = component.getByPlaceholderText('testLabel');
      expect(input).toBeVisible();
      expect(input).toHaveStyle('font-size: 20px');
      expect(container).toHaveStyle('width: 200px');
      expect(container).toHaveStyle('height: 40px');
    });
  });
  describe('InputField functions work', () => {
    test('submit and onChange works', async () => {
      const mockSubmit = jest.fn((e) => e.preventDefault());
      const mockChange = jest.fn();
      const component = render(<InputField id="test" placeholder="test" onSubmit={mockSubmit} onChange={mockChange} />);

      const input = component.getByPlaceholderText('test');
      await userEvent.type(input, 'test input');

      expect(input).toHaveValue('test input');

      expect(mockChange.mock.calls).toHaveLength(10);

      await userEvent.click(component.getByRole('button', { name: 'Submit' }));

      expect(mockSubmit.mock.calls).toHaveLength(1);
      expect(mockSubmit.mock.calls[0][0].target.elements[0].value).toBe('test input');
    });
  });
});
