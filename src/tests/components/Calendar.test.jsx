import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react/';
import Calendar from '../../components/Calendar';

describe('Calendar tests', () => {
  test('Calendar renders', () => {
    const component = render(<Calendar
      id="test"
      monday={{ state: 0, date: '2022-01-01' }}
      tuesday={{ state: 0, date: '2022-01-02' }}
      wednesday={{ state: 0, date: '2022-01-03' }}
      thursday={{ state: 0, date: '2022-01-04' }}
      friday={{ state: 0, date: '2022-01-05' }}
      saturday={{ state: 0, date: '2022-01-06' }}
      sunday={{ state: 0, date: '2022-01-07' }}
    />);

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
    const component = render(<Calendar
      id="test"
      monday={{ state: 2, date: '2022-01-01' }}
      tuesday={{ state: 1, date: '2022-01-02' }}
      wednesday={{ state: 0, date: '2022-01-03' }}
      thursday={{ state: 0, date: '2022-01-04' }}
      friday={{ state: 0, date: '2022-01-05' }}
      saturday={{ state: 0, date: '2022-01-06' }}
      sunday={{ state: 0, date: '2022-01-07' }}
    />);

    const container = component.container.querySelector('#test');
    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('calendar');

    expect(component.getByRole('button', { name: 'monday' }).className).toBe('calendar__date__btn--2');
    expect(component.getByRole('button', { name: 'tuesday' }).className).toBe('calendar__date__btn--1');
    expect(component.getByRole('button', { name: 'friday' }).className).toBe('calendar__date__btn--0');
  });
});
