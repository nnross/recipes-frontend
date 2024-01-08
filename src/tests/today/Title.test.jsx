import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import React from 'react';
import Title from '../../pages/today/Title';

describe('Title tests', () => {
  describe('Render tests', () => {
    test('title renders correctly', () => {
      const component = render(<Title id="test" title="Chocolate cake" time="45" servings="2" health="19" />);

      const container = component.container.querySelector('#test');
      expect(container).toBeVisible();
      expect(container.className).toBe('title');

      expect(component.getByText('Chocolate cake')).toBeVisible();
      expect(component.getByText('45 min')).toBeVisible();
      expect(component.getByText('2 servings')).toBeVisible();
      expect(component.getByText('19 health score')).toBeVisible();
    });
  });
});
