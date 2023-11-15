import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react/';
import ImageListItem from '../../components/ImageListItem';

describe('ImageListItem tests', () => {
  describe('render tests', () => {
    test('successful render works', () => {
      const component = render(<ImageListItem id="test" src="test route" title="test title" body="test body" itemId={2} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('imageListItem');

      expect(component.getByText('test title')).not.toBeVisible();
      expect(component.getByText('test body')).not.toBeVisible();

      expect(component.getByAltText('icon')).toBeVisible();
      expect(component.getByRole('presentation', { name: 'iconBtn' })).toBeVisible();

      expect(component.getByRole('link', { name: 'view full recipe', hidden: true })).toHaveAttribute('href', '/recipe/2');
      expect(component.getByRole('button', { name: 'view full recipe', hidden: true })).not.toBeVisible();

      expect(component.getByRole('button', { name: 'close', hidden: true })).not.toBeVisible();
    });
  });
  describe('ImageListItem functions work', () => {
    const widths = [[300, '0'], [700, '-100%'], [1000, '-100%'], [1400, '-100%']];
    test.each(widths)('Info opens and closes and view full recipe works', (width, left) => {
      global.innerWidth = width;
      global.dispatchEvent(new Event('resize'));

      const component = render(<ImageListItem id="test" src="test route" title="test title" body="test body" itemId={2} />);

      expect(component.getByText('test title')).not.toBeVisible();
      expect(component.getByText('test body')).not.toBeVisible();
      expect(component.getByRole('button', { name: 'view full recipe', hidden: true })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'close', hidden: true })).not.toBeVisible();

      fireEvent.click(component.getByRole('presentation', { name: 'iconBtn' }), { clientX: width - 50 });

      expect(component.getByText('test title')).toBeVisible();
      expect(component.getByText('test body')).toBeVisible();
      expect(component.getByRole('button', { name: 'view full recipe' })).toBeVisible();
      expect(component.getByRole('button', { name: 'close' })).toBeVisible();
      expect(component.container.querySelector('#test__info')).toHaveStyle(`left: ${left}`);

      fireEvent.click(component.getByRole('button', { name: 'close' }));

      expect(component.getByText('test title')).not.toBeVisible();
      expect(component.getByText('test body')).not.toBeVisible();
      expect(component.getByRole('button', { name: 'view full recipe', hidden: true })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'close', hidden: true })).not.toBeVisible();
    });
    test('Info works with open to right', () => {
      const component = render(<ImageListItem id="test" src="test route" title="test title" body="test body" itemId={2} />);

      expect(component.getByText('test title')).not.toBeVisible();
      expect(component.getByText('test body')).not.toBeVisible();
      expect(component.getByRole('button', { name: 'view full recipe', hidden: true })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'close', hidden: true })).not.toBeVisible();

      fireEvent.click(component.getByRole('presentation', { name: 'iconBtn' }));

      expect(component.getByText('test title')).toBeVisible();
      expect(component.getByText('test body')).toBeVisible();
      expect(component.getByRole('button', { name: 'view full recipe' })).toBeVisible();
      expect(component.getByRole('button', { name: 'close' })).toBeVisible();
      expect(component.container.querySelector('#test__info')).toHaveStyle('left: 100%');

      fireEvent.click(component.getByRole('button', { name: 'close' }));

      expect(component.getByText('test title')).not.toBeVisible();
      expect(component.getByText('test body')).not.toBeVisible();
      expect(component.getByRole('button', { name: 'view full recipe', hidden: true })).not.toBeVisible();
      expect(component.getByRole('button', { name: 'close', hidden: true })).not.toBeVisible();
    });
  });
});
