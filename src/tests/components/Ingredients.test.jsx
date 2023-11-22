import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react/';
import Ingredients from '../../components/Ingredients';
import { findWithTag } from '../testHelpers';
import { recipe1 } from '../testData/recipe';

describe('Ingredients tests', () => {
  describe('render tests', () => {
    test('ingredients render succesfully', () => {
      const component = render(<Ingredients id="test" ingredients={recipe1.ingredients} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('ingredients');

      expect(component.getByText('Ingredients')).toBeVisible();
      expect(component.getByText((content, node) => findWithTag(node, '5 clovesgarlic'))).toBeVisible();
    });
  });
});
