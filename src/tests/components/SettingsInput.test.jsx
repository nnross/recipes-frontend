import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import SettingsInput from '../../components/SettingsInput';

describe('SettingsInput tests', () => {
  describe('SettingsInput renders', () => {
    test('SettingsInput renders correctly', () => {
      const component = render(<SettingsInput id="test" title="test title" value="test value" disabled={false} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('settingsInput');

      expect(component.getByDisplayValue('test value')).toBeVisible();
      expect(component.getByText('test title')).toBeVisible();
    });
    test('SettingsInput disabled with placeholder works correctly', () => {
      const component = render(<SettingsInput id="test" title="test title" placeholder="test value" disabled />);

      expect(component.getByPlaceholderText('test value')).toBeDisabled();
    });
    test('SettingsInput onChange works correctly', async () => {
      const mock = jest.fn();
      const component = render(<SettingsInput id="test" title="test title" value="test value" disabled={false} onChange={mock} />);

      await userEvent.type(component.getByDisplayValue('test value'), 'test');
      expect(mock.mock.calls).toHaveLength(4);
    });
    test('SettingsInput password works correctly', async () => {
      const mock = jest.fn();
      const component = render(<SettingsInput password id="test" title="test title" value="test value" disabled={false} onChange={mock} />);

      expect(component.getByDisplayValue('test value')).toHaveAttribute('type', 'password');
    });
  });
});
