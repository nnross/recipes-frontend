import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Results from '../../pages/search/Results';
import { items } from '../testData/imageListItems.json';

jest.mock('../../components/ImageList');

describe('Results tests', () => {
  describe('render tests', () => {
    test('render with more results works succesfully', () => {
      const component = render(<Results id="test" items={items} moreResults />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('results');

      expect(component.getByText(items[0].title).toBeVisible());
      expect(component.getByText(items[0].id).toBeVisible());
      expect(component.getByText(items[0].body).toBeVisible());
      expect(component.getByText(items[0].src).toBeVisible());
      expect(component).getAllByText('test title').toHaveLength(5);

      expect(component.getByRole('button', { name: 'load more results' })).toBeVisible();
    });
    test('render with no more results works succesfully', () => {
      const component = render(<Results id="test" items={items} moreResults />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('results');

      expect(component.getByText(items[0].title).toBeVisible());
      expect(component.getByText(items[0].id).toBeVisible());
      expect(component.getByText(items[0].body).toBeVisible());
      expect(component.getByText(items[0].src).toBeVisible());
      expect(component).getAllByText('test title').toHaveLength(5);

      expect(component.getByRole('button', { name: 'load more results' })).nto.toBeVisible();
    });
  });
  describe('functions work', () => {
    test('load more works', async () => {
      const mockLoadMore = jest.fn();
      const component = render(<Results id="test" items={items} loadMore={mockLoadMore} />);

      await userEvent.click(component.getByRole('button', { name: 'load more results ' }));

      expect(mockLoadMore.mock.calls).toHaveLength(1);
    });
  });
});
