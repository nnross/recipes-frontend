import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react/';
import Ingredients from '../../components/Ingredients';

describe('Ingredients tests', () => {
  describe('render tests', () => {
    test('ingredients render succesfully', () => {
      const component = render(<Ingredients id="test" title="test title" body="test body" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('ingredients');

      expect(component.getByText('test title')).toBeVisible();
      expect(component.getByText('test title')).not.toBeNull();
      expect(component.getByText('test body')).toBeVisible();
      expect(component.getByText('test body')).not.toBeNull();
    });
  });
});
