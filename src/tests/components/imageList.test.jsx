import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react/';
import ImageList from '../../components/ImageList';
import { withMore } from '../testData/imageListItems.json';

jest.mock('../../../components/ImageListItem.jsx');

describe('imageList tests', () => {
  describe('render tests', () => {
    test('imageList renders', () => {
      const component = render(<ImageList id="test" items={withMore.items} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('imageList');

      expect(component.getByText(withMore.items[0].title)).toBeVisible();
      expect(component.getByText(withMore.items[0].body)).toBeVisible();
      expect(component.getByText(withMore.items[0].src)).toBeVisible();
      expect(component.getByText(withMore.items[0].id)).toBeVisible();

      expect(component.getAllByText('test title')).toHaveLength(5);
    });
  });
});
