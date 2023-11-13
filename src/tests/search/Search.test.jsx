/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Search from '../../pages/search/Search';
import { withMore, withNoMore } from '../testData/imageListItems.json';
import { getSomeRecipes } from '../../services/searchService';
import { UseSearch } from '../../pages/search/searchHooks';

jest.mock('../../pages/search/Filters');
jest.mock('../../pages/search/Results');
jest.mock('../../components/InputField');

const getSomeMock = () => Promise.resolve(withMore);
const getSomeRejectMock = () => Promise.reject(withMore);
jest.mock('../../services/searchService', () => ({
  getSomeRecipes: jest.fn(),
}));

const mockUseSearch = jest.fn();
jest.mock('../../pages/search/searchHooks', () => ({
  UseSearch: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  getSomeRecipes.mockImplementation(getSomeMock);

  UseSearch.mockImplementation((
    id,
    token,
    search,
    filters,
    page,
    setItems,
    setMoreItems,
    setLoading,
  ) => {
    mockUseSearch(id, token, search, filters, page);
    setItems(withNoMore.items);
    setMoreItems(false);
    setLoading(0);
  });
});

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
    test('search page renders fails works', async () => {
      getSomeRecipes.mockImplementation(getSomeRejectMock);
      const component = render(<Search id="test" />);

      await waitFor(() => {
        expect(component.getByText('an error occurred')).toBeVisible();
      });
    });
    test('back to search displays when scrolling down', () => {
      // TODO: test
      expect(false).toBeTruthy();
    });
    test('when loading displays loading icons', () => {
      const component = render(<Search id="test" />);

      const loading = component.container.querySelector('#loading');
      expect(loading).not.toBeNull();
      expect(loading).toBeVisible();
    });
  });
  describe('functionality works', () => {
    test('search works', async () => {
      const component = render(<Search id="test" />);

      await waitFor(() => {
        expect(component.getByPlaceholderText('Search'));
      });

      await userEvent.type(component.getByPlaceholderText('Search'), 'test input{enter}');

      expect(component.getByText(/test title load 1/)).toBeVisible();
      expect(component.getAllByText(/test title/)).toHaveLength(4);

      expect(mockUseSearch.mock.calls).toHaveLength(1);
      expect(mockUseSearch.mock.calls[0][3]).toStrictEqual(['vegetarian', 'italian']);
    });
    test('search fail works', async () => {
      UseSearch.mockImplementation((
        id,
        token,
        search,
        filters,
        page,
        setItems,
        setMoreItems,
        setLoading,
      ) => {
        mockUseSearch(id, token, search, filters, page);
        setItems(withNoMore.items);
        setMoreItems(false);
        setLoading(4);
      });
      const component = render(<Search id="test" />);

      await waitFor(() => {
        expect(component.getByPlaceholderText('Search'));
      });

      await userEvent.type(component.getByPlaceholderText('Search'), 'test input{enter}');

      await userEvent.type(component.getByPlaceholderText('Search'), 'test input{enter}');

      // TODO: correct error message.
      expect(component.getByText('an error occurred')).toBeVisible();
    });
    test('search sets results to load', async () => {
      UseSearch.mockImplementation((
        id,
        token,
        search,
        filters,
        page,
        setItems,
        setMoreItems,
      ) => {
        mockUseSearch(id, token, search, filters, page);
        setItems(withNoMore.items);
        setMoreItems(false);
      });
      const component = render(<Search id="test" />);

      await waitFor(() => {
        expect(component.getByPlaceholderText('Search'));
      });

      await userEvent.type(component.getByPlaceholderText('Search'), 'test input{enter}');

      const load = component.container.querySelector('#loading');
      expect(load).not.toBeNull();
      expect(load).toBeVisible();
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

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'load more results' }));
      });
      await userEvent.click(component.getByRole('button', { name: 'load more results' }));

      expect(component.getByText(/test title load 1/)).toBeVisible();
      expect(component.getAllByText(/test title/)).toHaveLength(16);

      expect(mockUseSearch.mock.calls).toHaveLength(1);
      expect(mockUseSearch.mock.calls[0][3]).toStrictEqual(['vegetarian', 'italian']);
    });
    test('load more fail works', async () => {
      UseSearch.mockImplementation((
        id,
        token,
        search,
        filters,
        page,
        setItems,
        setMoreItems,
        setLoading,
      ) => {
        mockUseSearch(id, token, search, filters, page);
        setItems(withNoMore.items);
        setMoreItems(false);
        setLoading(4);
      });
      const component = render(<Search id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'load more results' }));
      });

      await userEvent.click(component.getByRole('button', { name: 'load more results' }));

      // TODO: correct error message.
      expect(component.getByText('an error occurred')).toBeVisible();
    });
    test('load more sets loading state', async () => {
      UseSearch.mockImplementation((
        id,
        token,
        search,
        filters,
        page,
        setItems,
        setMoreItems,
      ) => {
        mockUseSearch(id, token, search, filters, page);
        setItems(withNoMore.items);
        setMoreItems(false);
      });
      const component = render(<Search id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'load more results' }));
      });

      await userEvent.click(component.getByRole('button', { name: 'load more results' }));

      const loadingBar = component.container.querySelector('#spinner');
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
    test('remove filter works', async () => {
      const component = render(<Search id="test" />);

      // TODO: search field goes away.
      await userEvent.click(component.getByRole('button', { name: 'back to search' }));

      // TODO: check we are back at search
      expect(false).toBeTruthy();
    });
  });
});
