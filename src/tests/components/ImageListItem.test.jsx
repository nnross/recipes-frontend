import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import ImageListItem from '../../components/ImageListItem';

afterEach(() => {
  global.innerWidth = 1080;
  global.dispatchEvent(new Event('resize'));
});

const getBoundingClientRectMock = jest.fn(() => ({
  x: 0, y: 0, width: 400, height: 400,
}));

global.document.getElementById = jest.fn(() => ({
  getBoundingClientRect: getBoundingClientRectMock,
}));

describe('ImageListItem tests', () => {
  describe('render tests', () => {
    test('successful render works', () => {
      const component = render(<ImageListItem id="test" src="test route" title="test title" body="test body" itemId={2} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('imageListItem');

      expect(component.getByText('test title')).not.toBeVisible();

      expect(component.getByAltText('icon')).toBeVisible();
      expect(component.getByRole('presentation', { name: 'iconBtn' })).toBeVisible();

      expect(component.getByRole('link', { name: 'view full recipe', hidden: true })).toHaveAttribute('href', '/recipe/2');
      expect(component.getByRole('button', { name: 'view full recipe', hidden: true })).not.toBeVisible();

      expect(component.getByRole('button', { name: 'close', hidden: true })).not.toBeVisible();
    });
  });
  describe('ImageListItem functions work', () => {
    const widths = [[300, '0'], [700, '-100%'], [1000, '-100%'], [1400, '-100%']];
    test.each(widths)('Info opens and closes and view full recipe works', async (width) => {
      global.innerWidth = width;
      global.dispatchEvent(new Event('resize'));

      const component = render(<ImageListItem id="test" src="test route" title="test title" body="test body" itemId={2} />);

      expect(component.getByText('test title')).not.toBeVisible();
      expect(component.getByRole('button', { name: 'view full recipe', hidden: true })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'close', hidden: true })).not.toBeVisible();

      await userEvent.click(component.getByRole('presentation', { name: 'iconBtn' }), { clientX: width - 50 });

      expect(component.getByText('test title')).toBeVisible();
      expect(component.getByRole('button', { name: 'view full recipe' })).toBeVisible();
      expect(component.getByRole('button', { name: 'close' })).toBeVisible();

      fireEvent.click(component.getByRole('button', { name: 'close' }));

      expect(component.getByText('test title')).not.toBeVisible();
      expect(component.getByRole('button', { name: 'view full recipe', hidden: true })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'close', hidden: true })).not.toBeVisible();
    });
    test('Info works with open to right', async () => {
      const component = render(<ImageListItem id="test" src="test route" title="test title" body="test body" itemId={2} />);

      expect(component.getByText('test title')).not.toBeVisible();
      expect(component.getByRole('button', { name: 'view full recipe', hidden: true })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'close', hidden: true })).not.toBeVisible();

      await userEvent.click(component.getByRole('presentation', { name: 'iconBtn' }));

      expect(component.getByText('test title')).toBeVisible();
      expect(component.getByRole('button', { name: 'view full recipe' })).toBeVisible();
      expect(component.getByRole('button', { name: 'close' })).toBeVisible();

      fireEvent.click(component.getByRole('presentation', { name: 'iconBtn' }), {
        clientX: 200,
        clientY: 300,
      });

      expect(component.getByText('test title')).not.toBeVisible();
      expect(component.getByRole('button', { name: 'view full recipe', hidden: true })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'close', hidden: true })).not.toBeVisible();
    });
  });
});
