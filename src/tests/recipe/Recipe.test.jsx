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
import { UseTag } from '../../pages/recipe/recipeHooks';
import { findWithTag } from '../testHelpers';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}));

const mockGetRecipe = () => Promise.resolve(recipe1);
const mockGetRecipeReject = () => Promise.reject();
jest.mock('../../services/recipeService', () => ({
  getRecipe: jest.fn(),
}));

const mockUseTag = jest.fn();
jest.mock('../../pages/recipe/recipeHooks', () => ({
  UseTag: jest.fn(),
}));

jest.mock('../../pages/recipe/RecipeButtons');
jest.mock('../../components/Ingredients');

beforeEach(() => {
  jest.useRealTimers();
  jest.clearAllMocks();
  useOutletContext.mockImplementation(() => [0, 'testToken', 'testAccountId', true]);
  getRecipe.mockImplementation(mockGetRecipe);

  UseTag.mockImplementation((action, recipeId, accountId, date, token, setLoading, setSelected) => {
    mockUseTag(action, recipeId, accountId, date, token);
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
      expect(component.getByText('5clovesgarlic')).toBeVisible();

      expect(component.getByText('test body this is a text that tells more about this dish. Mmm yummy yummy you really should make this recipe as it sounds delicious wow yay. Um this needs to be a bit longer to be realistic so yap yap yap yap yap yap yap yap')).toBeVisible();
      expect(component.getByText('Instructions')).toBeVisible();
      expect(component.getByText((content, node) => findWithTag(node, 'test instructions this is a text that tells more about this dish. Mmm yummy yummy you really should make this recipe as it sounds delicious wow yay. Um this needs to be a bit longer to be realistic so yap yap yap yap yap yap yap yap this is a text that tells more about this dish. Mmm yummy yummy you really should make this recipe as it sounds delicious wow yay. Um this needs to be a bit longer to be realistic so yap yap yap yap yap  yap yap yap'))).toBeVisible();

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
  });
  describe('Functionality tests', () => {
    test('favourite works', async () => {
      const component = render(<Recipe id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      });
      await userEvent.click(component.getByRole('button', { name: 'favourite' }));

      expect(mockUseTag.mock.calls).toHaveLength(1);
      expect(mockUseTag.mock.calls[0][0]).toBe('favourite');
      expect(mockUseTag.mock.calls[0][1]).toBe(0);
      expect(mockUseTag.mock.calls[0][2]).toBe('testAccountId');
      expect(mockUseTag.mock.calls[0][3]).toBe(null);
      expect(mockUseTag.mock.calls[0][4]).toBe('testToken');
    });
    test('do later works', async () => {
      const component = render(<Recipe id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      });

      await userEvent.click(component.getByRole('button', { name: 'add to do later' }));

      expect(mockUseTag.mock.calls).toHaveLength(1);
      expect(mockUseTag.mock.calls[0][0]).toBe('doLater');
      expect(mockUseTag.mock.calls[0][1]).toBe(0);
      expect(mockUseTag.mock.calls[0][2]).toBe('testAccountId');
      expect(mockUseTag.mock.calls[0][3]).toBe(null);
      expect(mockUseTag.mock.calls[0][4]).toBe('testToken');
    });
    test('add to calender works', async () => {
      const component = render(<Recipe id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      });

      await userEvent.click(component.getByRole('button', { name: 'add to calendar' }));

      expect(mockUseTag.mock.calls).toHaveLength(1);
      expect(mockUseTag.mock.calls[0][0]).toBe('toCalendar');
      expect(mockUseTag.mock.calls[0][1]).toBe(0);
      expect(mockUseTag.mock.calls[0][2]).toBe('testAccountId');
      expect(mockUseTag.mock.calls[0][3]).toBe('20-12-2022');
      expect(mockUseTag.mock.calls[0][4]).toBe('testToken');
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
      act(async () => {
        await new Promise((res) => { setTimeout(res, 3100); });
      });

      expect(component.queryByRole('you need to be logged in')).not.toBeInTheDocument();
    });
  });
});
