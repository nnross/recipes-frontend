import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Results from '../../pages/search/Results';
import { withMore, withNoMore } from '../testData/imageListItems.json';

jest.mock('../../components/ImageList');

describe('Results tests', () => {
  describe('render tests', () => {
    test('render with more results works succesfully', () => {
      const component = render(<Results id="test" items={withMore.items} moreResults />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('results');

      expect(component.getByText(/test title 12/)).toBeVisible();
      expect(component.getByText(/12/)).toBeVisible();
      expect(component.getByText(/test body 12/)).toBeVisible();
      expect(component.getAllByText(/test title/)).toHaveLength(12);

      expect(component.getByRole('button', { name: 'load more results' })).toBeVisible();
    });
    test('render with no more results works succesfully', () => {
      const component = render(<Results id="test" items={withNoMore.items} moreResults={false} />);

      expect(component.queryByRole('button', { name: 'load more results' })).not.toBeInTheDocument();
    });
    test('loading state works succesfully', () => {
      const component = render(<Results id="test" items={withNoMore.items} moreResults loading={2} />);

      expect(component.getByText('loading')).toBeVisible();
    });
  });
  describe('functions work', () => {
    test('load more works', async () => {
      const mockLoadMore = jest.fn();
      const component = render(<Results id="test" items={withMore.items} loadMore={mockLoadMore} moreResults />);

      await userEvent.click(component.getByRole('button', { name: 'load more results' }));

      expect(mockLoadMore.mock.calls).toHaveLength(1);
    });
  });
});
