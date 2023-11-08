import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react/';
import Footer from '../../components/Footer';
import { findWithTag } from '../testHelpers';

describe('Footer tests', () => {
  describe('footer renders', () => {
    test('footer renders correctly', () => {
      const component = render(<Footer id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('footer');

      expect(component.getByText('about this website')).toBeVisible();
      expect(component.getByText((content, node) => findWithTag(node, 'This application is our project for a college course. Please refer the github repository for more information.'))).toBeVisible();

      expect(component.getByRole('link', { name: 'repository' })).toBeVisible();
      expect(component.getByRole('link', { name: 'repository' })).toHaveAttribute('href', 'https://github.com/nnross/recipes-frontend/');

      expect(component.getByText('contacts')).toBeVisible();
      expect(component.getByText('iiro.s.partanen@gmail.com')).toBeVisible();
      expect(component.getByText('nellinatalie.rossi@gmail.com')).toBeVisible();
      expect(component.getByText('nnross@github.com')).toBeVisible();
      expect(component.getByText('iispar@github.com')).toBeVisible();
    });
  });
});
