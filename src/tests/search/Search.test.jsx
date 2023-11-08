import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Search from '../../pages/search/Search';

jest.mock('../../pages/search/Filters');
jest.mock('../../pages/search/Results');
jest.mock('../../pages/components/InputField');

describe('Search tests', () => {
  describe('render tests', () => {
    test('search page renders succesfully', () => {
      const component = render(<Search id="test" />);
      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('search');

      expect(component.getByPlaceholderText('Search')).toBeVisible();
      // TODO add all filters
      expect(component.getByRole('button', { name: 'filter' })).toBeVisible();
      expect(component.getByText('or scroll for suggestions')).toBeVisible();
      expect(component.getByText('test title 1')).toBeVisible();
      expect(component.getAllByText('test title')).toHaveLength(12);

      expect(component.getByRole('button', { name: 'load more results' })).toBeVisible();
      expect(component.getByRole('button', { name: 'back to search' })).not.toBeVisible();
    });
    test('back to search displays when scrolling down', () => {
      // TODO: test
      expect(false).toBeTruthy();
    });
    test('when loading displays loading icons', () => {
      const component = render(<Search id="test" />);
      const loading = component.container.querySelectorAll('#loadingIcon');
      expect(loading.toHaveLength(3));

      expect(component.getByPlaceholderText('Search')).not.toBeVisible();
      // TODO add all filters
      expect(component.getByRole('button', { name: 'filter' })).not.toBeVisible();
      expect(component.getByText('or scroll for suggestions')).not.toBeVisible();
      expect(component.getByText('test title 1')).not.toBeVisible();
      expect(component.getAllByText('test title')).toHaveLength(12);

      expect(component.getByRole('button', { name: 'load more results' })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'back to search' })).not.toBeVisible();
    });
  });
  describe('functionality works', () => {
    test('search works', async () => {
      const component = render(<Search id="test" />);

      await userEvent.type(component.getByPlaceholderText('Search'), 'test input{enter}');

      // TODO test that call happened
      expect(false).toBeTruthy();
      // TODO succesful results
      expect(component.getByText('test success 1')).toBeVisible();
      expect(component.getAllByText('test success')).toHaveLength(12);
    });
    test('search fail works', async () => {
      const component = render(<Search id="test" />);

      await userEvent.type(component.getByPlaceholderText('Search'), 'test input{enter}');

      // TODO test that call happened
      expect(false).toBeTruthy();
      // TODO how is error displayed
      expect(component.getByText('test success 1')).not.toBeVisible();
      expect(component.getAllByText('test success')).toHaveLength(0);
      expect(component.getByText('error whilst getting recipes')).toBeVisible();
    });
    test('search sets results to load', async () => {
      const component = render(<Search id="test" />);

      await userEvent.type(component.getByPlaceholderText('Search'), 'test input{enter}');

      // TODO test that call happened
      expect(false).toBeTruthy();
      // TODO right id for loading icons
      const loads = component.container.querySelector('#loadingIcon');
      expect(loads).toHaveLength(12);
    });
    test('filter selection works', async () => {
      const component = render(<Search id="test" />);

      // TODO filter name
      await userEvent.click(component.getByRole('button', { name: 'filter ' }));

      expect(component.getByText('filter')).toBeVisible();

      //  TODO: correct name
      await userEvent.click(component.getByRole('button', { name: 'apply ' }));

      // TODO test that call happened
      expect(false).toBeTruthy();
      // TODO succesful results
      expect(component.getByText('test success 1')).toBeVisible();
      expect(component.getAllByText('test success')).toHaveLength(12);
    });
    test('filter selection failure works', async () => {
      const component = render(<Search id="test" />);

      // TODO filter name
      await userEvent.click(component.getByRole('button', { name: 'filter ' }));

      expect(component.getByText('filter')).toBeVisible();

      //  TODO: correct name
      await userEvent.click(component.getByRole('button', { name: 'apply ' }));

      // TODO test that call happened
      expect(false).toBeTruthy();
      // TODO how is error displayed
      expect(component.getByText('test success 1')).not.toBeVisible();
      expect(component.getAllByText('test success')).toHaveLength(0);
      expect(component.getByText('error whilst getting recipes')).toBeVisible();
    });
    test('filter selection sets load state', async () => {
      const component = render(<Search id="test" />);

      // TODO filter name
      await userEvent.click(component.getByRole('button', { name: 'filter ' }));

      expect(component.getByText('filter')).toBeVisible();

      //  TODO: correct name
      await userEvent.click(component.getByRole('button', { name: 'apply ' }));

      // TODO test that call happened
      expect(false).toBeTruthy();
      // TODO how is error displayed
      // TODO test that call happened
      expect(false).toBeTruthy();
      // TODO right id for loading icons
      const loads = component.container.querySelector('#loadingIcon');
      expect(loads).toHaveLength(12);
    });
    test('load more works', async () => {
      const component = render(<Search id="test" />);

      await userEvent.click(component.getByRole('button', { name: 'load more results' }));

      expect(component.getByText('test title load 1')).toBeVisible();
      expect(component.getAllByText('test title')).toHaveLength(24);
    });
    test('load more fail works', async () => {
      const component = render(<Search id="test" />);

      await userEvent.click(component.getByRole('button', { name: 'load more results' }));

      // TODO: correct error message.
      expect(component.getByText('an error occurred')).toBeVisible();
    });
    test('load more sets loading state', async () => {
      const component = render(<Search id="test" />);

      await userEvent.click(component.getByRole('button', { name: 'load more results' }));

      // TODO right id for loading bar
      const loadingBar = component.container.querySelector('#loadingBar');
      expect(loadingBar).not.toBeNull();
      expect(loadingBar).toBeVisible();
    });
    test('back to search works', async () => {
      const component = render(<Search id="test" />);
      // TODO: scroll

      // TODO: search field goes away.
      await userEvent.click(component.getByRole('button', { name: 'back to search' }));

      // TODO: check we are back at search
      expect(false).toBeTruthy();
    });
  });
});
