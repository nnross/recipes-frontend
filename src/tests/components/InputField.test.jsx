import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import InputField from '../../components/InputField';

describe('InputField tests', () => {
  describe('InputField renders', () => {
    test('InputField renders correctly', () => {
      const component = render(<InputField id="test" placeholder="testLabel" width="200px" height="40px" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('inputField');

      const searchButton = component.container.querySelector('#test__container__search');
      expect(searchButton).not.toBeNull();
      expect(searchButton).toBeVisible();

      const input = component.getByPlaceholderText('testLabel');
      expect(input).not.toBeNull();
      expect(input).toBeVisible();
      expect(input).toHaveStyle('width: 200px');
      expect(input).toHaveStyle('height: 40px');
    });
  });
  describe('InputField functions work', () => {
    test('submit works', async () => {
      const mockSubmit = jest.fn();
      const component = render(<InputField id="test" onSubmit={mockSubmit} />);

      await userEvent.type(component, 'test input');

      expect(component).toHaveValue('test input');

      const searchButton = component.container.querySelector('#test__container__search');
      await userEvent.click(searchButton);

      expect(mockSubmit.mock.calls).toHaveLength(1);
      expect(mockSubmit.mock.calls[0][0]).toBe('test input');
    });
  });
});
