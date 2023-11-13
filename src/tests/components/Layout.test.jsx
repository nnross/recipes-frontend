import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react/';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Layout from '../../components/Layout';

const scrollToMock = jest.fn();
global.scrollTo = scrollToMock;

describe('Layout tests', () => {
  test('Layout renders', () => {
    const component = render(
      <BrowserRouter>
        <Layout id="test" />
      </BrowserRouter>,
    );
    const container = component.container.querySelector('#test');
    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('layout');

    expect(container.children).toHaveLength(3);
  });

  test('Layout scroll reduces header size', () => {
    const component = render(
      <BrowserRouter>
        <Layout id="test" />
      </BrowserRouter>,
    );

    const header = component.container.querySelector('#test__header');

    expect(header).toHaveStyle('height: 140px');

    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    expect(header).toHaveStyle('height: 90px');
  });
});
