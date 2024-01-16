/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react/';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { useOutletContext } from 'react-router-dom';
import Today from '../../pages/today/Today';
import { today } from '../testData/today.json';
import {
  getTodays, putFinished,
} from '../../services/recipeService';
import { UseTag } from '../../pages/recipe/recipeHooks';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}));

jest.mock('../../components/Calendar');
jest.mock('../../components/Ingredients');

const mockGetTodays = () => Promise.resolve(today);
const mockGetTodaysFail = () => Promise.reject();
const mockGetRecipeNoRecipe = () => Promise.resolve({
  recipe: null,
  calendar: {
    Monday: {
      date: '2024-01-08',
      state: 0,
    },
    Thursday: {
      date: '2024-01-11',
      state: 0,
    },
    Friday: {
      date: '2024-01-12',
      state: 0,
    },
    Sunday: {
      date: '2024-01-14',
      state: 0,
    },
    Wednesday: {
      date: '2024-01-10',
      state: 0,
    },
    Tuesday: {
      date: '2024-01-09',
      state: 0,
    },
    Saturday: {
      date: '2024-01-13',
      state: 0,
    },
  },
});
const mockPutFinished = () => Promise.resolve();
const mockPutFinishedFail = () => Promise.reject();
const mockUseTag = jest.fn();
jest.mock('../../services/recipeService', () => ({
  getTodays: jest.fn(),
  putFinished: jest.fn(),
}));
jest.mock('../../pages/recipe/recipeHooks', () => ({
  UseTag: jest.fn(),
}));

beforeEach(() => {
  delete window.location;
  window.location = new URL('https://www.example.com/today/2024-01-07');

  jest.useRealTimers();
  useOutletContext.mockImplementation(() => [0, 'testToken', 'testAccountId', true]);

  putFinished.mockImplementation(mockPutFinished);
  getTodays.mockImplementation(mockGetTodays);
  UseTag.mockImplementation((action, recipeId, date, token, setLoading, setSelected, selected) => {
    mockUseTag(action, recipeId, date, token);
    setLoading(0);
    setSelected(!selected);
  });
});

describe('todays recipe page tests', () => {
  describe('Render tests', () => {
    test('todays recipe page renders correctly', async () => {
      const component = render(<Today id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('today');

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'monday' })).toBeVisible();
      });
      expect(component.getByRole('button', { name: 'tuesday' })).toBeVisible();
      expect(component.getByRole('button', { name: 'wednesday' })).toBeVisible();
      expect(component.getByRole('button', { name: 'thursday' })).toBeVisible();
      expect(component.getByRole('button', { name: 'friday' })).toBeVisible();
      expect(component.getByRole('button', { name: 'saturday' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sunday' })).toBeVisible();

      expect(component.getByText('Spinach pie with home made dough')).toBeVisible();
      expect(component.getByText('Ingredients')).toBeVisible();
      expect(component.getByText('250gall purpose flour')).toBeVisible();
      expect(component.getByText('Instructions')).toBeVisible();
      expect(component.getByText('In a large bowl mix the butter and flour together until crumble (the butter must be at room temperature).')).toBeVisible();
      expect(component.getByText('Sunday')).toBeVisible();
      expect(component.getByText('January 7, 2024')).toBeVisible();
      expect(component.getByText('45 min')).toBeVisible();
      expect(component.getByText('10 servings')).toBeVisible();
      expect(component.getByText('24 health score')).toBeVisible();

      expect(component.container.querySelector('#label').children).toHaveLength(1);

      expect(component.getByAltText('icon')).toBeVisible();

      expect(component.getByRole('link', { name: 'original recipe' })).toHaveAttribute('href', 'http://www.foodista.com/recipe/47F2GTPW/spinach-pie-with-home-made-dough');
      expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      expect(component.getByRole('button', { name: 'finished' })).toBeVisible();
    });
    test('initial load error renders correctly', async () => {
      getTodays.mockImplementation(mockGetTodaysFail);

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
      getTodays.mockImplementation(mockGetRecipeNoRecipe);
      const component = render(<Today id="test" />);

      await waitFor(() => {
        expect(component.getByText('no recipe for this date yet')).toBeVisible();
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

      expect(putFinished.mock.calls).toHaveLength(1);
      expect(putFinished.mock.calls[0][0]).toBe(661323);
      expect(putFinished.mock.calls[0][1]).toBe('testToken');
    });
    test('finished button error works', async () => {
      putFinished.mockImplementation(mockPutFinishedFail);
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
      expect(mockUseTag.mock.calls).toHaveLength(1);
      expect(mockUseTag.mock.calls[0][0]).toBe('favourite');
      expect(mockUseTag.mock.calls[0][1]).toBe(661323);
      expect(mockUseTag.mock.calls[0][2]).toBe(null);
      expect(mockUseTag.mock.calls[0][3]).toBe('testToken');

      const unfavourite = component.getByRole('button', { name: 'unfavourite' });
      await userEvent.click(unfavourite);
      await waitFor(() => {
        expect(component.queryByRole('button', { name: 'unfavourite' })).not.toBeInTheDocument();
      });
      expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      expect(mockUseTag.mock.calls).toHaveLength(2);
      expect(mockUseTag.mock.calls[0][0]).toBe('favourite');
      expect(mockUseTag.mock.calls[0][1]).toBe(661323);
      expect(mockUseTag.mock.calls[0][2]).toBe(null);
      expect(mockUseTag.mock.calls[0][3]).toBe('testToken');
    });
    test('favourite button error works', async () => {
      // eslint-disable-next-line max-len
      UseTag.mockImplementation((action, recipeId, date, token, setLoading, setSelected, selected) => {
        setLoading(4);
      });
      const component = render(<Today id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      });
      const favourite = component.getByRole('button', { name: 'favourite' });
      await userEvent.click(favourite);

      await waitFor(() => {
        expect(component.getByText('failed to add recipe')).toBeVisible();
      });
    });
  });
});
