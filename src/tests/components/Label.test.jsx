import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react/';
import Label from '../../components/Label';

describe('Label tests', () => {
  describe('render tests', () => {
    test('label render succesfully', () => {
      const component = render(<Label id="test" src="test route" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('label');

      const image = component.container.querySelector('#test__image');
      expect(image).not.toBeNull();
      expect(image).toBeVisible();
    });
  });
});
