import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Layout from '../../components/Layout';

describe('Layout tests', () => {
  test('Layout renders', () => {
    const component = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>,
    );
    const container = component.container.querySelector('#layout');
    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('layout');

    expect(container.children).toHaveLength(3);
  });
});
