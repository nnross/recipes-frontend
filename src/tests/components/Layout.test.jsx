import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react/';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Layout from '../../components/Layout';

jest.mock('../../components/Header');
jest.mock('../../components/Footer');
jest.mock('../../pages/login/Login');
jest.mock('../../helpers/GuardedRoute');

describe('Layout tests', () => {
  test('Layout renders', () => {
    const component = render(
      <BrowserRouter>
        <Layout id="test" guarded={false} />
      </BrowserRouter>,
    );
    const container = component.container.querySelector('#test');
    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('layout');

    expect(container.children).toHaveLength(3);
  });
  test('Layout renders when guarded', () => {
    const component = render(
      <BrowserRouter>
        <Layout id="test" guarded />
      </BrowserRouter>,
    );

    expect(component.getByText('guarded')).toBeVisible();
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
  test('Layout login works', async () => {
    const component = render(
      <BrowserRouter>
        <Layout id="test" />
      </BrowserRouter>,
    );

    expect(component.queryByRole('Login')).not.toBeInTheDocument();

    await userEvent.click(component.getByRole('button', { name: 'open login' }));
    expect(component.getByText('Login')).toBeVisible();

    await userEvent.click(component.getByRole('button', { name: 'close login' }));

    expect(component.queryByRole('Login')).not.toBeInTheDocument();
  });
});
