import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react/';
import { useOutletContext } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Search from '../../pages/search/Search';
import { getSomeRecipes } from '../../services/searchService';
import { withMore, withNoMore } from '../testData/imageListItems.json';
import { UseSearch } from '../../pages/search/searchHooks';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}));
global.scrollTo = jest.fn();
jest.mock('../../components/SearchField');
jest.mock('../../pages/search/Filters');
jest.mock('../../pages/search/Results');

const mockGetSomeRecipes = () => Promise.resolve(withMore);
const mockGetSomeRecipesFail = () => Promise.reject();
const mockGetSomeRecipesAPIFail = () => {
  const error = new Error();
  error.response = { status: 503 };
  return (
    Promise.reject(error)
  );
};
const mockUseSearch = (
  accountId,
  token,
  input,
  filters,
  page,
  setItems,
  setMoreResults,
  setLoading,
) => {
  setLoading(0);
  setItems(withNoMore.recipes);
  return (
    Promise.resolve(withNoMore)
  );
};
const mockUseSearchFail = () => Promise.reject();
jest.mock('../../services/searchService', () => ({
  getSomeRecipes: jest.fn(),
}));
jest.mock('../../pages/search/searchHooks', () => ({
  UseSearch: jest.fn(),
}));

beforeEach(() => {
  useOutletContext.mockImplementation(() => [0, 'testToken', 'testAccountId', true]);
});

describe('Search tests', () => {
  describe('render tests', () => {
    test('search page renders correctly', () => {
      getSomeRecipes.mockImplementation(mockGetSomeRecipes);
      const component = render(<Search id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('search');

      expect(component.getByText('or scroll for suggestions')).toBeVisible();
      expect(component.getByRole('button', { name: 'add' })).toBeVisible();
      expect(component.getByRole('button', { name: 'reset' })).toBeVisible();
      expect(component.getByPlaceholderText('Search')).toBeVisible();
      expect(component.getByRole('button', { name: /Search/i })).toBeVisible();
    });
    test('search page load renders correctly', async () => {
      const component = render(<Search id="test" />);

      await waitFor(() => {
        expect(component.container.querySelectorAll('#loading')).toHaveLength(1);
      });
    });
  });
  describe('functionality tests', () => {
    test('getSomeRecipes works', async () => {
      getSomeRecipes.mockImplementation(mockGetSomeRecipes);
      const component = render(<Search id="test" />);

      await waitFor(() => {
        expect(component.getByText('test title 1')).toBeVisible();
      });
      expect(component.getByText('test title 12')).toBeVisible();
    });
    test('getSomeRecipes fail works', async () => {
      getSomeRecipes.mockImplementation(mockGetSomeRecipesFail);
      const component = render(<Search id="test" />);

      await waitFor(() => {
        expect(component.getByText('an error occurred')).toBeVisible();
      });
    });
    test('getSomeRecipes API fail works', async () => {
      getSomeRecipes.mockImplementation(mockGetSomeRecipesAPIFail);
      const component = render(<Search id="test" />);

      await waitFor(() => {
        expect(component.getByText('API limit reached, try again tomorrow.')).toBeVisible();
      });
    });
    test('searchResults works', async () => {
      getSomeRecipes.mockImplementation(mockGetSomeRecipes);
      UseSearch.mockImplementation(mockUseSearch);
      const component = render(<Search id="test" />);

      await userEvent.type(component.getByPlaceholderText('Search'), 'test');
      await userEvent.click(component.getByRole('button', { name: /Search/i }));

      await waitFor(() => {
        expect(component.getByText('test title load 1')).toBeVisible();
      });
      expect(component.getByText('test title 4')).toBeVisible();
    });
    test('changeFilters works', async () => {
      getSomeRecipes.mockImplementation(mockGetSomeRecipes);
      UseSearch.mockImplementation(mockUseSearch);
      const component = render(<Search id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'pöö' })).toBeVisible();
      });
    });
  });
});
