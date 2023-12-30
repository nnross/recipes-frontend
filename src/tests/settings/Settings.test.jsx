import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react/';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Settings from '../../pages/settings/Settings';
import { useOutletContext } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { user } from '../testData/account.json';
import { getAccountData, postAccountData, deleteAccountData } from '../../services/personService';
import { findWithTag } from '../testHelpers';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}));

Object.defineProperty(window, 'location', {
  configurable: true,
  value: { reload: jest.fn() },
});

const mockGetAccountData = () => Promise.resolve(user);
const mockGetAccountDataFail = () => Promise.reject();
const mockPostAccountData = () => Promise.resolve();
const mockPostAccountDataFail = () => Promise.reject();
const mockDeleteAccountData = () => Promise.resolve();
const mockDeleteAccountDataFail = () => Promise.reject();
jest.mock('../../services/personService', () => ({
  getAccountData: jest.fn(),
  postAccountData: jest.fn(),
  deleteAccountData: jest.fn(),
}));

beforeEach(() => {
  jest.useRealTimers();
  useOutletContext.mockImplementation(() => [0, 'testToken', 'testAccountId', true]);
  getAccountData.mockImplementation(mockGetAccountData);
  postAccountData.mockImplementation(mockPostAccountData);
  deleteAccountData.mockImplementation(mockDeleteAccountData);
});

describe('Settings tests', () => {
  describe('Render tests', () => {
    test('settings page renders correctly', async () => {
      const component = render(<Settings id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('settings');

      expect(component.getByText('user settings')).toBeVisible();
      await waitFor(() => {
        expect(component.getByText('username')).toBeVisible();
      });
      expect(component.getByText('username')).toBeVisible();
      expect(component.getByText('name')).toBeVisible();
      expect(component.getByText('email')).toBeVisible();
      expect(component.getByText('password')).toBeVisible();

      expect(component.getByDisplayValue('test username')).toBeVisible();
      expect(component.getByDisplayValue('test name')).toBeVisible();
      expect(component.getByDisplayValue('test email')).toBeVisible();
      expect(component.getByPlaceholderText('••••••••')).toBeVisible();

      expect(component.getByRole('button', { name: 'edit' })).toBeVisible();
      expect(component.getByRole('button', { name: 'delete account' })).toBeVisible();

      expect(component.queryByText('confirm with previous password')).not.toBeInTheDocument();
      expect(component.queryByRole('button', { name: 'save' })).not.toBeInTheDocument();
      expect(component.queryByRole('button', { name: 'cancel' })).not.toBeInTheDocument();
      expect(component.queryByText('are you sure you want to delete your account')).not.toBeInTheDocument();
      expect(component.queryByRole('button', { name: 'delete' })).not.toBeInTheDocument();
    });
    test('settings page load renders correctly', async () => {
      const component = render(<Settings id="test" />);

      await waitFor(() => {
        expect(component.container.querySelectorAll('#loading')).toHaveLength(1);
      });
    });
    test('settings page error renders correctly', async () => {
      getAccountData.mockImplementation(mockGetAccountDataFail);
      const component = render(<Settings id="test" />);

      await waitFor(() => {
        expect(component.getByText('an error occurred')).toBeVisible();
      });
    });
  });
  describe('functionality tests', () => {
    test('edit button works', async () => {
      const component = render(<Settings id="test" />);

      await waitFor(() => {
        expect(component.getByText('username')).toBeVisible();
      });

      const edit = component.getByRole('button', { name: 'edit' });
      await userEvent.click(edit);

      expect(component.getByRole('button', { name: 'save' })).toBeVisible();
      expect(component.getByRole('button', { name: 'cancel' })).toBeVisible();
      expect(component.queryByRole('button', { name: 'edit' })).not.toBeInTheDocument();
      expect(component.queryByRole('button', { name: 'delete account' })).not.toBeInTheDocument();

      expect(component.getByDisplayValue('test username')).not.toBeDisabled();
      expect(component.getByDisplayValue('test name')).not.toBeDisabled();
      expect(component.getByDisplayValue('test email')).not.toBeDisabled();
      expect(component.getByPlaceholderText('••••••••')).not.toBeDisabled();

      const password = component.getByPlaceholderText('••••••••');
      await userEvent.type(password, 'test');
      expect(component.getByText('confirm with current password')).toBeVisible();
    });
    test('save button works', async () => {
      const component = render(<Settings id="test" />);

      await waitFor(() => {
        expect(component.getByText('username')).toBeVisible();
      });

      const edit = component.getByRole('button', { name: 'edit' });
      await userEvent.click(edit);

      await userEvent.type(component.getByDisplayValue('test username'), ' new');
      await userEvent.type(component.getByDisplayValue('test name'), ' new');
      await userEvent.type(component.getByDisplayValue('test email'), ' new');

      const save = component.getByRole('button', { name: 'save' });
      await userEvent.click(save);

      // mock actual call
      expect(postAccountData.mock.calls).toHaveLength(1);
      expect(postAccountData.mock.calls[0][2].account.username).toBe('test username new');
      expect(postAccountData.mock.calls[0][2].account.name).toBe('test name new');
      expect(postAccountData.mock.calls[0][2].account.email).toBe('test email new');

      expect(component.getByDisplayValue('test username new')).toBeVisible();
      expect(component.getByDisplayValue('test name new')).toBeVisible();
      expect(component.getByDisplayValue('test email new')).toBeVisible();
      expect(component.getByRole('button', { name: 'edit' })).toBeVisible();
      expect(component.getByRole('button', { name: 'delete account' })).toBeVisible();
    });
    test('save button error works', async () => {
      postAccountData.mockImplementation(mockPostAccountDataFail);
      const component = render(<Settings id="test" />);

      await waitFor(() => {
        expect(component.getByText('username')).toBeVisible();
      });

      const edit = component.getByRole('button', { name: 'edit' });
      await userEvent.click(edit);

      const save = component.getByRole('button', { name: 'save' });
      await userEvent.click(save);

      expect(component.getByText('an error occurred')).toBeVisible();

      await act(async () => {
        await new Promise((res) => { setTimeout(res, 1100); });
      });

      expect(component.queryByText('an error occurred')).not.toBeInTheDocument();
    });
    test('delete account button and delete button works', async () => {
      const component = render(<Settings id="test" />);

      await waitFor(() => {
        expect(component.getByText('username')).toBeVisible();
      });

      const deleteAccount = component.getByRole('button', { name: 'delete account' });
      await userEvent.click(deleteAccount);

      expect(component.getByText((content, node) => findWithTag(node, 'are you sure you want to delete your account'))).toBeVisible();
      expect(component.getByRole('button', { name: 'cancel' })).toBeVisible();
      expect(component.getByRole('button', { name: 'delete' })).toBeVisible();

      const confirmDelete = component.getByRole('button', { name: 'delete' });
      await userEvent.click(confirmDelete);

      expect(deleteAccountData.mock.calls).toHaveLength(1);
      expect(deleteAccountData.mock.calls[0][0]).toBe('testAccountId');
      expect(deleteAccountData.mock.calls[0][1]).toBe('testToken');
    });
    test('delete account error works', async () => {
      deleteAccountData.mockImplementation(mockDeleteAccountDataFail);
      const component = render(<Settings id="test" />);

      await waitFor(() => {
        expect(component.getByText('username')).toBeVisible();
      });

      const deleteAccount = component.getByRole('button', { name: 'delete account' });
      await userEvent.click(deleteAccount);

      const confirmDelete = component.getByRole('button', { name: 'delete' });
      await userEvent.click(confirmDelete);

      expect(component.getByText('an error occurred')).toBeVisible();

      await act(async () => {
        await new Promise((res) => { setTimeout(res, 1100); });
      });

      expect(component.queryByText('an error occurred')).not.toBeInTheDocument();
    });
    test('cancel edit button works', async () => {
      const component = render(<Settings id="test" />);

      await waitFor(() => {
        expect(component.getByText('username')).toBeVisible();
      });

      const edit = component.getByRole('button', { name: 'edit' });
      await userEvent.click(edit);

      expect(component.getByRole('button', { name: 'save' })).toBeVisible();
      expect(component.getByRole('button', { name: 'cancel' })).toBeVisible();

      await userEvent.type(component.getByDisplayValue('test username'), ' new');
      await userEvent.type(component.getByDisplayValue('test name'), ' new');
      await userEvent.type(component.getByDisplayValue('test email'), ' new');

      const cancelEdit = component.getByRole('button', { name: 'cancel' });
      await userEvent.click(cancelEdit);

      expect(component.getByDisplayValue('test username')).toBeVisible();
      expect(component.getByDisplayValue('test name')).toBeVisible();
      expect(component.getByDisplayValue('test email')).toBeVisible();
      expect(component.getByPlaceholderText('••••••••')).toBeVisible();
      expect(component.getByRole('button', { name: 'edit' })).toBeVisible();
      expect(component.getByRole('button', { name: 'delete account' })).toBeVisible();
    });
    test('cancel delete button works', async () => {
      const component = render(<Settings id="test" />);

      await waitFor(() => {
        expect(component.getByText('username')).toBeVisible();
      });

      const deleteAccount = component.getByRole('button', { name: 'delete account' });
      await userEvent.click(deleteAccount);

      expect(component.getByText((content, node) => findWithTag(node, 'are you sure you want to delete your account'))).toBeVisible();

      const cancelDelete = component.getByRole('button', { name: 'cancel' });
      await userEvent.click(cancelDelete);

      expect(component.queryByText((content, node) => findWithTag(node, 'are you sure you want to delete your account'))).not.toBeInTheDocument();
    });
  });
});
