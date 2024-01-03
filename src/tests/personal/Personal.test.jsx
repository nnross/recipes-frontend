/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react/';
import { useOutletContext } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { personal } from '../testData/personal.json';
import { withNoMore } from '../testData/itemList.json';
import { getPersonal } from '../../services/personalService';
import { UseGetItems } from '../../pages/personal/personalHooks';
import Personal from '../../pages/personal/Personal';
import { findWithTag } from '../testHelpers';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}));

jest.mock('../../pages/personal/List');
jest.mock('../../pages/personal/Statistics');
jest.mock('../../components/Calendar');
jest.mock('../../helpers/dateHelpers.jsx', () => ({
  getDate: jest.fn(() => '2022-02-02'),
}));

const getPersonalMock = () => Promise.resolve(personal);
const getPersonalRejectMock = () => Promise.reject();
jest.mock('../../services/personalService', () => ({
  getPersonal: jest.fn(),
}));
const mockUseGetItem = jest.fn();
jest.mock('../../pages/personal/personalHooks', () => ({
  UseGetItems: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  useOutletContext.mockImplementation(() => [0, 'testToken', 'testAccountId', true]);
  getPersonal.mockImplementation(getPersonalMock);

  UseGetItems.mockImplementation((
    accountId,
    token,
    view,
    page,
    setItems,
    setIsNext,
    setLoading,
  ) => {
    mockUseGetItem(accountId, token, view, page);
    setItems(withNoMore.recipes);
    if (page === 1) setIsNext(false);
    else setIsNext(true);
    setLoading(0);
  });
});

describe('Personal page tests', () => {
  describe('Personal page renders', () => {
    test('successful render works', async () => {
      const component = render(<Personal id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('personal');

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'M' })).toBeVisible();
      });
      expect(component.getByRole('button', { name: 'Tu' })).toBeVisible();
      expect(component.getByRole('button', { name: 'W' })).toBeVisible();
      expect(component.getByRole('button', { name: 'Th' })).toBeVisible();
      expect(component.getByRole('button', { name: 'F' })).toBeVisible();
      expect(component.getByRole('button', { name: 'Sa' })).toBeVisible();
      expect(component.getByRole('button', { name: 'Su' })).toBeVisible();

      expect(component.getByRole('button', { name: 'today\'s recipe' })).toHaveAttribute('href', '/today/2022-02-02');

      expect(component.getByRole('button', { name: 'favourites' })).toBeDisabled();
      expect(component.getByRole('button', { name: 'do later' })).toBeVisible();

      expect(component.getByText('test title 11')).toBeVisible();

      expect(component.getByRole('button', { name: 'next' })).toBeVisible();
      expect(component.getByRole('button', { name: 'previous' })).toBeDisabled();

      expect(component.getByText('Your favourite cuisines')).toBeVisible();
      expect(component.getByText('indian12')).toBeVisible();
      expect(component.getByText((content, node) => findWithTag(node, '23finished recipes'))).toBeVisible();
      expect(component.getByText((content, node) => findWithTag(node, '17favourite recipes'))).toBeVisible();
      expect(component.getByText((content, node) => findWithTag(node, '12saved to do later'))).toBeVisible();
    });
    test('loading render works', async () => {
      const component = render(<Personal id="test" />);

      const load = component.container.querySelectorAll('#loading');
      await waitFor(() => {
        expect(load).toHaveLength(3);
      });
    });
    test('error render works', async () => {
      getPersonal.mockImplementation(getPersonalRejectMock);
      const component = render(<Personal id="test" />);

      await waitFor(() => {
        expect(component.getByText('an error occurred'));
      });
    });
  });
  describe('functions work', () => {
    test('recipe view switch works', async () => {
      const component = render(<Personal id="test" />);

      await waitFor(() => {
        expect(component.getByText('test title 11')).toBeVisible();
      });

      await userEvent.click(component.getByRole('button', { name: 'do later' }));

      await waitFor(() => {
        expect(component.getByText('test title load 191')).toBeVisible();
      });
    });
    test('pagination works', async () => {
      const component = render(<Personal id="test" />);

      await waitFor(() => {
        expect(component.getByText('test title 11')).toBeVisible();
      });

      expect(component.getByRole('button', { name: 'previous' })).toBeDisabled();
      await userEvent.click(component.getByRole('button', { name: 'next' }));

      await waitFor(() => {
        expect(component.getByText('test title load 191')).toBeVisible();
      });
      expect(component.getByRole('button', { name: 'previous' })).toBeVisible();
      expect(component.getByRole('button', { name: 'next' })).toBeDisabled();

      await userEvent.click(component.getByRole('button', { name: 'previous' }));

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'previous' })).toBeDisabled();
        expect(component.getByRole('button', { name: 'next' })).toBeVisible();
      });
    });
  });
});
