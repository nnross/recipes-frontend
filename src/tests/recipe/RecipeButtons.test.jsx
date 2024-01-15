/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RecipeButtons from '../../pages/recipe/RecipeButtons';

jest.mock('../../components/Spinner');

describe('recipeButtons tests', () => {
  describe('render tests', () => {
    test('component renders successfully', () => {
      const component = render(<RecipeButtons id="test" source="test" />);

      expect(component.getByText('original recipe')).toHaveAttribute('href', 'test');
      expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      expect(component.getByRole('button', { name: 'add to do later' })).toBeVisible();
      expect(component.getByRole('button', { name: 'add to calendar' })).toBeVisible();
    });
    const components = [['favourite', 'favourite'], ['doLater', 'add to do later'], ['toCalendar', 'add to calendar']];
    test.each(components)('component load renders successfully ', (curr, comp) => {
      const component = render(<RecipeButtons id="test" source="test" loading={2} current={curr} />);

      expect(component.getByText('loading')).toBeVisible();
      expect(component.queryByText(comp)).not.toBeInTheDocument();
    });
    test('component with style renders successfully ', () => {
      const component = render(<RecipeButtons id="test" source="test" favourite later calendar />);

      const favouriteImage = component.container.querySelector('#test__all__favourite__img');
      const laterImage = component.container.querySelector('#test__all__dolater__img');
      const calendarImage = component.container.querySelector('#test__all__calendar__img');

      expect(favouriteImage).toHaveStyle('filter: invert(15%) sepia(59%) saturate(6731%) hue-rotate(356deg) brightness(97%) contrast(116%)');
      expect(laterImage).toHaveStyle('filter: invert(15%) sepia(59%) saturate(6731%) hue-rotate(356deg) brightness(97%) contrast(116%)');
      expect(calendarImage).toHaveStyle('filter: invert(15%) sepia(59%) saturate(6731%) hue-rotate(356deg) brightness(97%) contrast(116%)');
    });
    test('reminder renders ', () => {
      const component = render(<RecipeButtons id="test" source="test" reminder />);

      expect(component.getByText('You need to be logged in to do this.')).toBeVisible();
    });
  });
  describe('functions work', () => {
    test('tag works', async () => {
      const mockTag = jest.fn();
      const component = render(<RecipeButtons id="test" source="test" tag={mockTag} />);

      await userEvent.click(component.getByRole('button', { name: 'add to do later' }));
      await userEvent.click(component.getByRole('button', { name: 'favourite' }));

      await userEvent.click(component.getByRole('button', { name: 'add to calendar' }));
      await userEvent.type(component.container.querySelector('#test__all__date__buttons__date'), '12-12-2222');
      await userEvent.click(component.getByRole('button', { name: 'add' }));
    });
    test('cancel calender workds', async () => {
      const component = render(<RecipeButtons id="test" source="test" />);

      await userEvent.click(component.getByRole('button', { name: 'add to calendar' }));
      await userEvent.click(component.getByRole('button', { name: 'cancel' }));

      expect(component.queryByRole('button', { name: 'close' })).not.toBeInTheDocument();
    });
  });
});
