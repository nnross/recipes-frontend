import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react/';
import Label from '../../components/Label';
import { recipe1 } from '../testData/recipe.json';

describe('Label tests', () => {
  describe('render tests', () => {
    test('label render succesfully', () => {
      const component = render(<Label id="test" labels={recipe1.diets} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('label');
      expect(container.children).toHaveLength(2);
    });
  });
});
