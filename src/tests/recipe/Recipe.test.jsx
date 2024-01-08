/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react/';
import { useOutletContext } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Recipe from '../../pages/recipe/Recipe';
import { recipe1 } from '../testData/recipe.json';
import { getRecipe } from '../../services/recipeService';
import { UseTag, addToDb } from '../../pages/recipe/recipeHooks';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
  useNavigate: () => mockedUsedNavigate,
}));

const mockGetRecipe = () => Promise.resolve(recipe1);
const mockGetRecipeReject = () => Promise.reject();
jest.mock('../../services/recipeService', () => ({
  getRecipe: jest.fn(),
}));

const mockUseTag = jest.fn();
const mockToDb = jest.fn();
jest.mock('../../pages/recipe/recipeHooks', () => ({
  addToDb: jest.fn(),
  UseTag: jest.fn(),
}));

jest.mock('../../pages/recipe/RecipeButtons');
jest.mock('../../components/Ingredients');

beforeEach(() => {
  jest.useRealTimers();
  jest.clearAllMocks();
  useOutletContext.mockImplementation(() => [0, 'testToken', 'testAccountId', true]);
  getRecipe.mockImplementation(mockGetRecipe);

  addToDb.mockImplementation((action, accountId, token, recipe, date, setLoading, setSelected) => {
    mockToDb(action, accountId, recipe, date, token);
    setLoading(0);
    setSelected(true);
  });

  UseTag.mockImplementation((action, recipeId, date, token, setLoading, setSelected) => {
    mockUseTag(action, recipeId, date, token);
    setLoading(0);
    setSelected(true);
  });
});
describe('Recipe tests', () => {
  describe('render tests', () => {
    test('render works succesfully', async () => {
      const component = render(<Recipe id="test" />);

      await waitFor(() => {
        const container = component.container.querySelector('#test');
        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(container.className).toBe('recipe');
      });

      expect(component.getByText('Chocolate cake')).toBeVisible();
      expect(component.getByText('Ingredients')).toBeVisible();
      expect(component.getByText('2Tbspscheese')).toBeVisible();

      expect(component.getByText('Instructions')).toBeVisible();
      expect(component.getByText('test instructions this is a text that tells more about this dish.')).toBeVisible();
      expect(component.getByRole('button', { name: 'add to calendar' })).toBeVisible();
      expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      expect(component.getByRole('button', { name: 'add to do later' })).toBeVisible();

      expect(component.getByRole('link', { name: 'original recipe' })).toHaveAttribute('href', 'http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html');
    });
    test('render fail works', async () => {
      getRecipe.mockImplementation(mockGetRecipeReject);
      const component = render(<Recipe id="test" />);

      await waitFor(() => {
        expect(component.getByText('error whilst loading')).toBeVisible();
      });
    });
    test('render load works', async () => {
      const component = render(<Recipe id="test" />);

      const load = component.container.querySelector('#loading');
      expect(load).not.toBeNull();
      await waitFor(() => {
        expect(load).toBeVisible();
      });
    });

    test('already own recipe redirects', async () => {
      getRecipe.mockImplementation(() => Promise.resolve(''));

      render(<Recipe id="test" />);

      await waitFor(() => {
        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('Functionality tests', () => {
    test('favourite works', async () => {
      const component = render(<Recipe id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      });
      await userEvent.click(component.getByRole('button', { name: 'favourite' }));

      expect(mockToDb.mock.calls).toHaveLength(1);
      expect(mockToDb.mock.calls[0][0]).toBe('favourite');
      expect(mockToDb.mock.calls[0][1]).toBe('testAccountId');
      expect(mockToDb.mock.calls[0][2]).toBe(recipe1);
      expect(mockToDb.mock.calls[0][3]).toBe(null);
      expect(mockToDb.mock.calls[0][4]).toBe('testToken');
    });
    test('do later works', async () => {
      const component = render(<Recipe id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      });

      await userEvent.click(component.getByRole('button', { name: 'add to do later' }));

      expect(mockToDb.mock.calls).toHaveLength(1);
      expect(mockToDb.mock.calls[0][0]).toBe('doLater');
      expect(mockToDb.mock.calls[0][1]).toBe('testAccountId');
      expect(mockToDb.mock.calls[0][2]).toBe(recipe1);
      expect(mockToDb.mock.calls[0][3]).toBe(null);
      expect(mockToDb.mock.calls[0][4]).toBe('testToken');
    });
    test('add to calender works', async () => {
      const component = render(<Recipe id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      });

      await userEvent.click(component.getByRole('button', { name: 'add to calendar' }));

      expect(mockToDb.mock.calls).toHaveLength(1);
      expect(mockToDb.mock.calls[0][0]).toBe('toCalendar');
      expect(mockToDb.mock.calls[0][1]).toBe('testAccountId');
      expect(mockToDb.mock.calls[0][2]).toBe(recipe1);
      expect(mockToDb.mock.calls[0][3]).toBe('20-12-2022');
      expect(mockToDb.mock.calls[0][4]).toBe('testToken');
    });

    test('tag works after addingToDb', async () => {
      const component = render(<Recipe id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      });

      await userEvent.click(component.getByRole('button', { name: 'add to calendar' }));
      await userEvent.click(component.getByRole('button', { name: 'add to calendar' }));
      await userEvent.click(component.getByRole('button', { name: 'favourite' }));
      await userEvent.click(component.getByRole('button', { name: 'add to do later' }));

      expect(mockUseTag.mock.calls).toHaveLength(3);
      expect(mockUseTag.mock.calls[0][0]).toBe('toCalendar');
      expect(mockUseTag.mock.calls[0][1]).toBe(0);
      expect(mockUseTag.mock.calls[0][2]).toBe('20-12-2022');
      expect(mockUseTag.mock.calls[0][3]).toBe('testToken');

      expect(mockUseTag.mock.calls[1][0]).toBe('favourite');
      expect(mockUseTag.mock.calls[1][1]).toBe(0);
      expect(mockUseTag.mock.calls[1][2]).toBe(null);
      expect(mockUseTag.mock.calls[1][3]).toBe('testToken');

      expect(mockUseTag.mock.calls[2][0]).toBe('doLater');
      expect(mockUseTag.mock.calls[2][1]).toBe(0);
      expect(mockUseTag.mock.calls[2][2]).toBe(null);
      expect(mockUseTag.mock.calls[2][3]).toBe('testToken');
    });

    test('logged out favourite doesn\'t work', async () => {
      useOutletContext.mockImplementation(() => [0, 'testToken', 'testAccountId', false]);
      const component = render(<Recipe id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      });
      await userEvent.click(component.getByRole('button', { name: 'favourite' }));

      expect(component.getByText('you need to be logged in')).toBeVisible();

      // TODO: better way to deal with setTimeout
      await act(async () => {
        await new Promise((res) => { setTimeout(res, 3100); });
      });

      expect(component.queryByRole('you need to be logged in')).not.toBeInTheDocument();
    });
  });
});
