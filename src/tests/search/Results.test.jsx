import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Results from '../../pages/search/Results';
import { withMore } from '../testData/imageListItems.json';

jest.mock('../../components/ImageList');
jest.mock('../../components/Spinner');

describe('recipeButtons tests', () => {
  describe('render tests', () => {
    test('component renders successfully with no more results', async () => {
      const component = render(<Results id="test" items={withMore.recipes} moreResults={false} loading={0} isRandom={false} />);

      await waitFor(() => {
        const container = component.container.querySelector('#test');
        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(container.className).toBe('results');
      });

      expect(component.getByText('no more results'));
    });
    test('component renders successfully with random results', async () => {
      const component = render(<Results id="test" items={withMore.recipes} moreResults={false} loading={0} isRandom />);

      await waitFor(() => {
        const container = component.container.querySelector('#test');
        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(container.className).toBe('results');
      });

      expect(component.queryByText('no more results')).not.toBeInTheDocument();
    });
    test('component renders successfully with loading', async () => {
      const component = render(<Results id="test" items={withMore.recipes} moreResults={false} loading={2} isRandom />);

      await waitFor(() => {
        const container = component.container.querySelector('#test');
        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(container.className).toBe('results');
      });

      expect(component.getByText('loading')).toBeVisible();
    });

    test('component renders successfully with error', async () => {
      const component = render(<Results id="test" items={withMore.recipes} moreResults={false} loading={4} isRandom />);

      await waitFor(() => {
        const container = component.container.querySelector('#test');
        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(container.className).toBe('results');
      });

      expect(component.getByText('an error occurred')).toBeVisible();
    });
  });
  describe('functions work', () => {
    test('load more works', async () => {
      const mock = jest.fn();
      const component = render(<Results id="test" items={withMore.recipes} moreResults loadMore={mock} loading={0} isRandom={false} />);

      await waitFor(() => {
        const container = component.container.querySelector('#test');
        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(container.className).toBe('results');
      });

      await userEvent.click(component.getByRole('button', { name: 'load more results' }));

      expect(mock.mock.calls).toHaveLength(1);
    });
  });
});
