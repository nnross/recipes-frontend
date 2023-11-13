/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react/';
import { useOutletContext } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Search from '../../pages/search/Search';
import { withMore, withNoMore } from '../testData/imageListItems.json';
import { getSomeRecipes } from '../../services/searchService';
import { UseSearch } from '../../pages/search/searchHooks';

jest.mock('../../pages/search/Filters');
jest.mock('../../pages/search/Results');
jest.mock('../../components/InputField');

const scrollToMock = jest.fn();
global.scrollTo = scrollToMock;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}));

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
    test('search page renders succesfully', async () => {
      const component = render(<Search id="test" />);
      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('search');

      expect(component.getByPlaceholderText('Search')).toBeVisible();

      expect(component.getByRole('button', { name: 'add' })).toBeVisible();
      expect(component.getByRole('button', { name: 'reset' })).toBeVisible();
      expect(component.getByText('or scroll for suggestions')).toBeVisible();

      await waitFor(() => {
        expect(component.getByText('test title 1')).toBeVisible();
      });
      expect(component.getAllByText(/test title/)).toHaveLength(12);

      expect(component.getByRole('button', { name: 'load more results' })).toBeVisible();
      expect(component.getByLabelText('top')).not.toBeVisible();
    });
    test('search page renders fails works', async () => {
      getSomeRecipes.mockImplementation(getSomeRejectMock);
      const component = render(<Search id="test" />);

      await waitFor(() => {
        expect(component.getByText('an error occurred')).toBeVisible();
      });
    });
    test('back to search displays when scrolling down', async () => {
      useOutletContext.mockImplementation(() => 220);
      const component = render(<Search id="test" />);

      await waitFor(() => {
        expect(component.getByLabelText('top')).toBeVisible();
      });
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
      expect(mockUseSearch.mock.calls[0][3]).toStrictEqual([]);
    });
    test('search works with filters', async () => {
      const component = render(<Search id="test" />);

      await waitFor(() => {
        expect(component.getByPlaceholderText('Search'));
      });

      await userEvent.click(component.getByRole('button', { name: 'add' }));

      await userEvent.type(component.getByPlaceholderText('Search'), 'test input{enter}');

      expect(component.getByText(/test title load 1/)).toBeVisible();
      expect(component.getAllByText(/test title/)).toHaveLength(4);

      expect(mockUseSearch.mock.calls).toHaveLength(1);
      expect(mockUseSearch.mock.calls[0][3]).toStrictEqual(['test-addition']);
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
    test('load more works', async () => {
      const component = render(<Search id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'load more results' }));
      });
      await userEvent.click(component.getByRole('button', { name: 'load more results' }));

      expect(component.getByText(/test title load 1/)).toBeVisible();
      expect(component.getAllByText(/test title/)).toHaveLength(16);

      expect(mockUseSearch.mock.calls).toHaveLength(1);
      expect(mockUseSearch.mock.calls[0][3]).toStrictEqual([]);
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
      useOutletContext.mockImplementation(() => 220);
      const component = render(<Search id="test" />);

      await userEvent.click(component.getByLabelText('top'));

      expect(scrollToMock).toHaveBeenCalledTimes(1);
    });
    test('remove filter works', async () => {
      const component = render(<Search id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'add' })).toBeVisible();
      });

      await userEvent.click(component.getByRole('button', { name: 'add' }));
      expect(component.getByText('addition')).toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'reset' }));
      expect(component.queryByText('addition')).not.toBeInTheDocument();

      await userEvent.click(component.getByRole('button', { name: 'add' }));
      expect(component.getByText('addition')).toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'remove' }));
      expect(component.queryByText('addition')).not.toBeInTheDocument();
    });
  });
});
