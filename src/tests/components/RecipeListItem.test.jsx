import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react/';
import RecipeListItem from '../../components/RecipeListItem';

describe('recipeListItem tests', () => {
  test('recipeListItem renders', () => {
    const component = render(<RecipeListItem title="test title" id="test" itemId={2} />);

    const container = component.container.querySelector('#test');
    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('recipeListItem');

    expect(component.getByText('test title')).toBeVisible();
    expect(component.getByText('go to recipe')).toHaveAttribute('href', '/ownRecipe/2');
  });
  test('recipeListItem renders with longer title', () => {
    const component = render(<RecipeListItem title="this title is over the limit in characters" id="test" itemId={2} />);

    expect(component.getByText('this title is over the limit in characters')).toHaveStyle('font-size: 20px');
  });
});
