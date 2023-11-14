import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Info from '../../pages/recipe/Info';

describe('Info tests', () => {
  describe('render tests', () => {
    test('render works succesfully', () => {
      const component = render(<Info id="test" labels={['TODO Label']} title="recipe title" desc="recipe desc" instructions="test instructions" ingredients={['water', 'milk']} servings={4} minutes={20} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('info');

      expect(component.getByText('recipe title')).toBeVisible();
      expect(component.getByText('recipe desc')).toBeVisible();
      expect(component.getByText('ingredients')).toBeVisible();
      expect(component.getByText('water')).toBeVisible();
      expect(component.getByText('mil')).toBeVisible();
      expect(component.getByText('instructions')).toBeVisible();
      expect(component.getByText('test instructions')).toBeVisible();
      expect(component.getByText('4 servings')).toBeVisible();
      expect(component.getByText('20 minutes')).toBeVisible();

      expect(component.getByText('vegan')).toBeVisible();

      expect(component.getByRole('button', { name: 'add to calender' })).toBeVisible();
      expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      expect(component.getByRole('button', { name: 'add to do later' })).toBeVisible();

      expect(component.getByRole('link', { name: 'original recipe' })).toHaveAttribute('href', 'TODO');
    });
  });
  describe('Functionality tests', () => {
    test('buttons work works succesfully', async () => {
      const mockClick = jest.fn();
      const component = render(<Info id="test" onClick={mockClick} />);

      await userEvent.click(component.getByRole('button', { name: 'add to calender' }));
      await userEvent.click(component.getByRole('button', { name: 'favourite' }));
      await userEvent.click(component.getByRole('button', { name: 'add to do later' }));

      expect(mockClick.mock.calls).toHaveLength(3);
      expect(mockClick.mock.calls[0][0]).toBe('calender');
      expect(mockClick.mock.calls[0][1]).toBe('ID');
      expect(mockClick.mock.calls[1][0]).toBe('favourite');
      expect(mockClick.mock.calls[1][1]).toBe('ID');
      expect(mockClick.mock.calls[2][0]).toBe('later');
      expect(mockClick.mock.calls[2][1]).toBe('ID');
    });
  });
});
