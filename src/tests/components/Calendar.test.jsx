import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react/';
import Calendar from '../../components/Calendar';

jest.mock('../../helpers/dateHelpers.jsx', () => ({
  getWeekDates: jest.fn(() => ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05', '2022-01-06', '2022-01-07']),
}));

describe('Calendar tests', () => {
  test('Calendar renders', () => {
    const component = render(<Calendar id="test" />);

    const container = component.container.querySelector('#test');
    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('calendar');

    expect(component.getByRole('link', { name: 'M' })).toHaveAttribute('href', '/today/2022-01-01');
    expect(component.getByRole('link', { name: 'Tu' })).toHaveAttribute('href', '/today/2022-01-02');
    expect(component.getByRole('link', { name: 'W' })).toHaveAttribute('href', '/today/2022-01-03');
    expect(component.getByRole('link', { name: 'Th' })).toHaveAttribute('href', '/today/2022-01-04');
    expect(component.getByRole('link', { name: 'F' })).toHaveAttribute('href', '/today/2022-01-05');
    expect(component.getByRole('link', { name: 'Sa' })).toHaveAttribute('href', '/today/2022-01-06');
    expect(component.getByRole('link', { name: 'Su' })).toHaveAttribute('href', '/today/2022-01-07');
  });
  test('recipe shows as filled or done or empty renders', () => {
    const component = render(<Calendar id="test" monday={2} tuesday={1} wednesday={0} />);

    const container = component.container.querySelector('#test');
    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('calendar');

    expect(component.getByRole('button', { name: 'monday' }).className).toBe('calendar__date__btn--2');
    expect(component.getByRole('button', { name: 'tuesday' }).className).toBe('calendar__date__btn--1');
    expect(component.getByRole('button', { name: 'friday' }).className).toBe('calendar__date__btn--0');
  });
});
