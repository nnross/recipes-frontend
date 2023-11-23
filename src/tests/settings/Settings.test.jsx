import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Settings from '../../pages/settings/Settings';

describe('Settings tests', () => {
  describe('Render tests', () => {
    test('settings page renders correctly', () => {
      const component = render(<Settings id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('settings');

      expect(component.getByText('user settings')).toBeVisible();
      expect(component.getByText('username')).toBeVisible();
      expect(component.getByText('name')).toBeVisible();
      expect(component.getByText('email address')).toBeVisible();
      expect(component.getByText('password')).toBeVisible();

      expect(component.getByText('test username')).toBeVisible();
      expect(component.getByText('test name')).toBeVisible();
      expect(component.getByText('test email')).toBeVisible();
      expect(component.getByText('test password')).toBeVisible();

      expect(component.getByRole('button', { name: 'edit' })).toBeVisible();
      expect(component.getByRole('button', { name: 'delete account' })).toBeVisible();

      expect(component.getByText('old password')).not.toBeVisible();
      expect(component.getByText('new password')).not.toBeVisible();
      expect(component.getByPlaceholderText('test username')).not.toBeVisible();
      expect(component.getByPlaceholderText('test name')).not.toBeVisible();
      expect(component.getByPlaceholderText('test email')).not.toBeVisible();
      expect(component.getByPlaceholderText('old password')).not.toBeVisible();
      expect(component.getByPlaceholderText('new password')).not.toBeVisible();
      expect(component.getByRole('button', { name: 'save' })).not.toBeVisible();
    });
  });
  describe('functionality tests', () => {
    test('edit button works', async () => {
      const component = render(<Settings id="test" />);

      const edit = component.getByRole('button', { name: 'edit' });
      await userEvent.click(edit);

      expect(component.getByText('test username')).not.toBeVisible();
      expect(component.getByText('test name')).not.toBeVisible();
      expect(component.getByText('test email')).not.toBeVisible();
      expect(component.getByText('test password')).not.toBeVisible();
      expect(component.getByRole('button', { name: 'edit' })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'delete account' })).not.toBeVisible();

      expect(component.getByText('old password')).toBeVisible();
      expect(component.getByText('new password')).toBeVisible();
      expect(component.getByPlaceholderText('test username')).toBeVisible();
      expect(component.getByPlaceholderText('test name')).toBeVisible();
      expect(component.getByPlaceholderText('test email')).toBeVisible();
      expect(component.getByPlaceholderText('old password')).toBeVisible();
      expect(component.getByPlaceholderText('new password')).toBeVisible();
      expect(component.getByRole('button', { name: 'save' })).toBeVisible();
    });
    test('save button works', async () => {
      const component = render(<Settings id="test" />);

      await userEvent.type(component.getByPlaceholderText('test username'), 'test new username');
      await userEvent.type(component.getByPlaceholderText('test name'), 'test new name');
      await userEvent.type(component.getByPlaceholderText('test email'), 'test new email');
      await userEvent.type(component.getByPlaceholderText('old password'), 'test old password');
      await userEvent.type(component.getByPlaceholderText('new password'), 'test new password');

      const save = component.getByRole('button', { name: 'save' });
      await userEvent.click(save);

      // mock actual call
      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe('test new username');
      expect(mock.mock.calls[0][1]).toBe('test new name');
      expect(mock.mock.calls[0][2]).toBe('test new email');
      expect(mock.mock.calls[0][3]).toBe('test old password');
      expect(mock.mock.calls[0][4]).toBe('test new password');

      expect(component.getByText('test new username')).toBeVisible();
      expect(component.getByText('test new name')).toBeVisible();
      expect(component.getByText('test new email')).toBeVisible();
      expect(component.getByText('test new password')).toBeVisible();
      expect(component.getByRole('button', { name: 'edit' })).toBeVisible();
      expect(component.getByRole('button', { name: 'delete account' })).toBeVisible();
    });
    test('delete account button works', async () => {
      const component = render(<Settings id="test" />);

      const deleteAccount = component.getByRole('button', { name: 'delete account' });
      await userEvent.click(deleteAccount);

      expect(component.getByText('are you sure you want to delete your account')).toBeVisible();
      expect(component.getByRole('button', { name: 'cancel' })).toBeVisible();
      expect(component.getByRole('button', { name: 'delete' })).toBeVisible();
    });
    test('cancel button works', async () => {
      const component = render(<Settings id="test" />);

      const cancelDelete = component.getByRole('button', { name: 'cancel' });
      await userEvent.click(cancelDelete);

      expect(component.getByText('are you sure you want to delete your account')).not.toBeVisible();
      expect(component.getByRole('button', { name: 'cancel' })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'delete' })).not.toBeVisible();
    });
    test('delete button works', async () => {
      const component = render(<Settings id="test" />);

      const confirmDelete = component.getByRole('button', { name: 'delete' });
      await userEvent.click(confirmDelete);

      // mock actual call
      expect(mock.mock.calls).toHaveLength(1);
    });
  });
});
