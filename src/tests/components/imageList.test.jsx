import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react/';
import ImageList from '../../components/ImageList';
import { withMore } from '../testData/imageListItems.json';

jest.mock('../../components/ImageListItem.jsx');

describe('imageList tests', () => {
  describe('render tests', () => {
    test('imageList renders', () => {
      const component = render(<ImageList id="test" items={withMore.recipes} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('imageList');

      expect(component.getByText(/test title 12/)).toBeVisible();
      expect(component.getByText(/test body 12/)).toBeVisible();
      expect(component.getAllByText(/https:\/\/spoonacular.com\/recipeImages\/284420-636x393.jpg/)).toHaveLength(4);
      expect(component.getByText(/12/)).toBeVisible();

      expect(component.getAllByText(/test title/)).toHaveLength(12);
    });
  });
});
