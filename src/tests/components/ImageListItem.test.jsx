import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import ImageListItem from '../../components/ImageListItem';

const mockedUseNavigate = jest.fn();
// mocks the useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ImageListItem tests', () => {
  describe('render tests', () => {
    test('successful render works', () => {
      const component = render(<ImageListItem id="test" src="test route" title="test title" body="test body" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('imageListItem');

      expect(component.getByText('test title')).not.toBeVisible();
      expect(component.getByText('body')).not.toBeVisible();

      const image = component.container.querySelector('#test__image');
      expect(image).not.toBeNull();
      expect(image).toBeVisible();

      expect(component.getByRole('button', { name: 'view full recipe' })).not.toBeVisible();
      const closeButton = component.container.querySelector('#test__info__close');
      expect(closeButton).not.toBeNull();
      expect(closeButton).not.toBeVisible();
    });
  });
  describe('ImageListItem functions work', () => {
    test('Info opens and closes and view full recipe works', async () => {
      const component = render(<ImageListItem id="test" src="test route" title="test title" body="test body" itemId={4} />);

      expect(component.getByText('test title')).not.toBeVisible();
      expect(component.getByText('body')).not.toBeVisible();
      expect(component.getByRole('button', { name: 'view full recipe' })).not.toBeVisible();
      const closeButton = component.container.querySelector('#test__info__close');
      expect(closeButton).not.toBeNull();
      expect(closeButton).not.toBeVisible();

      await userEvent.click(component.container.querySelector('#test__image'));

      expect(component.getByText('test title')).toBeVisible();
      expect(component.getByText('body')).toBeVisible();
      expect(component.getByRole('button', { name: 'view full recipe' })).toBeVisible();
      expect(closeButton).toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'view full recipe' }));

      expect(mockedUseNavigate.mock.calls).toHaveLength(1);
      expect(mockedUseNavigate.mock.calls[0][0]).toBe(4);

      await userEvent.click(closeButton);

      expect(component.getByText('test title')).not.toBeVisible();
      expect(component.getByText('body')).not.toBeVisible();
      expect(component.getByRole('button', { name: 'view full recipe' })).not.toBeVisible();
      expect(closeButton).not.toBeVisible();
    });
  });
});
