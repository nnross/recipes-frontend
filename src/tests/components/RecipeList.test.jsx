import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react/';
import RecipeList from '../../components/RecipeList';
import { withMore } from '../testData/itemList.json';

jest.mock('../../components/RecipeListItem.jsx');

describe('recipeList tests', () => {
  test('recipeList renders', () => {
    const component = render(<RecipeList items={withMore.items} id="test" />);

    const container = component.container.querySelector('#test');
    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('recipeList');

    expect(component.getByText('test title 1')).toBeVisible();
  });
});
