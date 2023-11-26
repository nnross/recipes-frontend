/* eslint-disable import/no-unresolved */
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react/';
import { useOutletContext } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Search from '../../pages/search/Search';
import { personal, personalNoMore } from '../testData/personal.json';
import { withMore, withNoMore } from '../testData/itemList.json';
import { getPersonal } from '../../services/personalService';
import { UseGetItems } from '../../pages/personal/personalHooks';
import Personal from '../../pages/personal/Personal';
import { findWithTag } from '../testHelpers';
import List from '../../pages/personal/List';
import Statistics from '../../pages/personal/Statistics';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    // eslint-disable-next-line react/prop-types
    ResponsiveContainer: ({ children }) => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

describe('Personal page statistics list tests', () => {
  describe('Personal page statistics renders', () => {
    test('successful render works', () => {
      const component = render(<Statistics id="test" chart={personal.chart} doneCount={21} doLaterCount={10} favouriteCount={9} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('statistics');

      expect(component.getByText('Your favourite cuisines')).toBeVisible();

      expect(component.getByText('thai')).toBeVisible();
      expect(component.getByText('asian')).toBeVisible();
      expect(component.getByText('chinese')).toBeVisible();
      expect(component.getByText('indian')).toBeVisible();
      expect(component.getByText((content, node) => findWithTag(node, '21finished recipes'))).toBeVisible();
      expect(component.getByText((content, node) => findWithTag(node, '9favourite recipes'))).toBeVisible();
      expect(component.getByText((content, node) => findWithTag(node, '10saved to do later'))).toBeVisible();
    });
  });
});
