import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { withMore } from '../testData/itemList.json';
import List from '../../pages/personal/List';

jest.mock('../../components/RecipeList');
jest.mock('../../components/Spinner');

describe('Personal recipe list tests', () => {
  describe('Personal recipe list renders', () => {
    test('successful render works', () => {
      const component = render(<List id="test" items={withMore.recipes} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('list');

      expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      expect(component.getByRole('button', { name: 'do later' })).toBeVisible();

      expect(component.getByText('test title 11')).toBeVisible();

      expect(component.getByRole('button', { name: 'next' })).toBeVisible();
      expect(component.getByRole('button', { name: 'previous' })).toBeVisible();
    });
    test('disables buttons works', () => {
      const component = render(<List id="test" items={withMore.recipes} isNext={false} isPrev={false} />);

      expect(component.getByRole('button', { name: 'next' })).toBeDisabled();
      expect(component.getByRole('button', { name: 'previous' })).toBeDisabled();
    });

    test('favourite view works', () => {
      const component = render(<List id="test" items={withMore.recipes} view="favourite" />);

      expect(component.getByRole('button', { name: 'favourite' })).toBeDisabled();
      expect(component.getByRole('button', { name: 'do later' })).toBeVisible();
    });
    test('do later view works', () => {
      const component = render(<List id="test" items={withMore.recipes} view="doLater" />);

      expect(component.getByRole('button', { name: 'do later' })).toBeDisabled();
      expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
    });
    test('loading works', () => {
      const component = render(<List id="test" items={withMore.recipes} loading={2} />);

      expect(component.getByText('loading')).toBeVisible();
    });
  });
  describe('functions work', () => {
    test('next and previous work', async () => {
      const next = jest.fn();
      const prev = jest.fn();
      const component = render(<List id="test" items={withMore.recipes} next={next} prev={prev} isPrev />);

      await userEvent.click(component.getByRole('button', { name: 'next' }));

      await userEvent.click(component.getByRole('button', { name: 'previous' }));

      expect(next.mock.calls).toHaveLength(1);
      expect(prev.mock.calls).toHaveLength(1);
    });
    test('view switch works', async () => {
      const mock = jest.fn();
      const component = render(<List id="test" items={withMore.recipes} changeView={mock} />);

      await userEvent.click(component.getByRole('button', { name: 'do later' }));
      await userEvent.click(component.getByRole('button', { name: 'favourite' }));

      expect(mock.mock.calls).toHaveLength(2);
      expect(mock.mock.calls[0][0]).toBe('doLater');
      expect(mock.mock.calls[1][0]).toBe('favourite');
    });
  });
});
