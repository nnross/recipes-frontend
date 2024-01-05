import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react/';
import Instructions from '../../components/Instructions';

describe('Instructions tests', () => {
  describe('render tests', () => {
    test('instructions render succesfully', () => {
      const component = render(<Instructions id="test" instructions={['do this and that', 'then do this']} />);

      const container = component.container.querySelector('#test__info');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('instructions__info');

      expect(component.getByText('Instructions')).toBeVisible();
      expect(component.getByText('do this and that')).toBeVisible();
    });
  });
});
