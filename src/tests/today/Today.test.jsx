/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react/';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { useOutletContext } from 'react-router-dom';
import Today from '../../pages/today/Today';
import { recipe1 } from '../testData/recipe.json';
import {
  getRecipeByDate, postFavourite, postFinished, deleteFavourite,
} from '../../services/recipeService';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}));

jest.mock('../../components/Calendar');
jest.mock('../../components/Ingredients');

const mockGetRecipeByDate = () => Promise.resolve(recipe1);
const mockGetRecipeByDateFail = () => Promise.reject();
const mockGetRecipeNoRecipe = () => Promise.resolve({ title: null });
const mockPostFinished = () => Promise.resolve();
const mockPostFinishedFail = () => Promise.reject();
const mockDeleteFavourite = () => Promise.resolve();
const mockDeleteFavouriteFail = () => Promise.reject();
const mockPostFavourite = () => Promise.resolve();
const mockPostFavouriteFail = () => Promise.reject();
jest.mock('../../services/recipeService', () => ({
  getRecipeByDate: jest.fn(),
  postFinished: jest.fn(),
  deleteFavourite: jest.fn(),
  postFavourite: jest.fn(),
}));

beforeEach(() => {
  delete window.location;
  window.location = new URL('https://www.example.com/today/02-02-2022');

  jest.useRealTimers();
  useOutletContext.mockImplementation(() => [0, 'testToken', 'testAccountId', true]);

  getRecipeByDate.mockImplementation(mockGetRecipeByDate);
  postFavourite.mockImplementation(mockPostFavourite);
  postFinished.mockImplementation(mockPostFinished);
  deleteFavourite.mockImplementation(mockDeleteFavourite);
});

// tee error viesti
// tee mockit kaikista mistä tarvii

// kaikki renderöityy testaa
// lataukset (harmaat laatikot) renderöityy (jätä vain await waitFor pois)
// epäonnistunut lataus toimii (kysy ipeltä)
// ei reseptiä lataus toimii (kysy ipeltä)

// kaikki funktiot kun onnistuu ja kun epäonnistuu (epäonnistuminen ipeltä)

describe('todays recipe page tests', () => {
  describe('Render tests', () => {
    test('todays recipe page renders correctly', async () => {
      const component = render(<Today id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('today');

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'M' })).toBeVisible();
      });
      expect(component.getByRole('button', { name: 'Tu' })).toBeVisible();
      expect(component.getByRole('button', { name: 'W' })).toBeVisible();
      expect(component.getByRole('button', { name: 'Th' })).toBeVisible();
      expect(component.getByRole('button', { name: 'F' })).toBeVisible();
      expect(component.getByRole('button', { name: 'Sa' })).toBeVisible();
      expect(component.getByRole('button', { name: 'Su1' })).toBeVisible();

      expect(component.getByText('Chocolate cake')).toBeVisible();
      expect(component.getByText('Ingredients')).toBeVisible();
      expect(component.getByText('2Tbspscheese')).toBeVisible();
      expect(component.getByText('Instructions')).toBeVisible();
      expect(component.getByText('test instructions this is a text that tells more about this dish.')).toBeVisible();
      expect(component.getByText('Wednesday')).toBeVisible();
      expect(component.getByText('February 2, 2022')).toBeVisible();
      expect(component.getByText('45 min')).toBeVisible();
      expect(component.getByText('2 servings')).toBeVisible();
      expect(component.getByText('19 health score')).toBeVisible();

      expect(component.container.querySelector('#label').children).toHaveLength(3);

      expect(component.getByAltText('icon')).toBeVisible();

      expect(component.getByRole('link', { name: 'original recipe' })).toHaveAttribute('href', 'http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html');
      expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      expect(component.getByRole('button', { name: 'finished' })).toBeVisible();
    });
    test('initial load error renders correctly', async () => {
      getRecipeByDate.mockImplementation(mockGetRecipeByDateFail);

      const component = render(<Today id="test" />);

      await waitFor(() => {
        expect(component.getByText('an error occurred :(')).toBeVisible();
      });
    });
    test('loading renders correctly', async () => {
      const component = render(<Today id="test" />);
      await waitFor(() => {
        expect(component.container.querySelectorAll('#loading')).toHaveLength(2);
      });
    });
    test('no recipe renders correctly', async () => {
      getRecipeByDate.mockImplementation(mockGetRecipeNoRecipe);
      const component = render(<Today id="test" />);

      await waitFor(() => {
        expect(component.getByText('no recipe for this day')).toBeVisible();
      });
    });
  });
  describe('Functionality tests', () => {
    test('finished button works', async () => {
      const component = render(<Today id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'finished' })).toBeVisible();
      });
      const finished = component.getByRole('button', { name: 'finished' });
      await userEvent.click(finished);

      await waitFor(() => {
        expect(component.queryByRole('button', { name: 'finished' })).not.toBeInTheDocument();
      });

      expect(postFinished.mock.calls).toHaveLength(1);
      expect(postFinished.mock.calls[0][0]).toBe(1);
      expect(postFinished.mock.calls[0][1]).toBe('testAccountId');
      expect(postFinished.mock.calls[0][2]).toBe('02-02-2022');
      expect(postFinished.mock.calls[0][3]).toBe('testToken');
    });
    test('finished button error works', async () => {
      postFinished.mockImplementation(mockPostFinishedFail);
      const component = render(<Today id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'finished' })).toBeVisible();
      });
      const finished = component.getByRole('button', { name: 'finished' });
      await userEvent.click(finished);

      await waitFor(() => {
        expect(component.getByText('failed to add recipe')).toBeVisible();
      });

      await act(async () => {
        await new Promise((res) => { setTimeout(res, 1500); });
      });

      expect(component.queryByText('failed to add recipe')).not.toBeInTheDocument();
    });
    test('favourite button works', async () => {
      const component = render(<Today id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      });
      const favourite = component.getByRole('button', { name: 'favourite' });
      await userEvent.click(favourite);

      await waitFor(() => {
        expect(component.queryByRole('button', { name: 'favourite' })).not.toBeInTheDocument();
      });
      expect(component.getByRole('button', { name: 'unfavourite' })).toBeVisible();
      expect(postFavourite.mock.calls).toHaveLength(1);
      expect(postFavourite.mock.calls[0][0]).toBe(1);
      expect(postFavourite.mock.calls[0][1]).toBe('testAccountId');
      expect(postFavourite.mock.calls[0][2]).toBe('testToken');
    });
    test('favourite button error works', async () => {
      const component = render(<Today id="test" />);

      postFavourite.mockImplementation(mockPostFavouriteFail);
      await waitFor(() => {
        expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      });
      const favourite = component.getByRole('button', { name: 'favourite' });
      await userEvent.click(favourite);

      await waitFor(() => {
        expect(component.getByText('failed to add recipe')).toBeVisible();
      });

      await act(async () => {
        await new Promise((res) => { setTimeout(res, 1500); });
      });

      expect(component.queryByText('failed to add recipe')).not.toBeInTheDocument();
    });
    test('unfavourite button works', async () => {
      const component = render(<Today id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      });
      const favourite = component.getByRole('button', { name: 'favourite' });
      await userEvent.click(favourite);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'unfavourite' })).toBeVisible();
      });
      const unfavourite = component.getByRole('button', { name: 'unfavourite' });
      await userEvent.click(unfavourite);

      await waitFor(() => {
        expect(component.queryByRole('button', { name: 'unfavourite' })).not.toBeInTheDocument();
      });
      expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      expect(deleteFavourite.mock.calls).toHaveLength(1);
      expect(deleteFavourite.mock.calls[0][0]).toBe(1);
      expect(deleteFavourite.mock.calls[0][1]).toBe('testAccountId');
      expect(deleteFavourite.mock.calls[0][2]).toBe('testToken');
    });
    test('unfavourite button error works', async () => {
      const component = render(<Today id="test" />);

      deleteFavourite.mockImplementation(mockDeleteFavouriteFail);
      await waitFor(() => {
        expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      });
      const favourite = component.getByRole('button', { name: 'favourite' });
      await userEvent.click(favourite);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'unfavourite' })).toBeVisible();
      });
      const unfavourite = component.getByRole('button', { name: 'unfavourite' });
      await userEvent.click(unfavourite);

      await waitFor(() => {
        expect(component.getByText('failed to add recipe')).toBeVisible();
      });

      await act(async () => {
        await new Promise((res) => { setTimeout(res, 1500); });
      });

      expect(component.queryByText('failed to add recipe')).not.toBeInTheDocument();
    });
  });
});
