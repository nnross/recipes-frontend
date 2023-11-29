import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { getWeekDates, getDate } from '../../helpers/dateHelpers';

beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(2022, 2, 2));
});

describe('datehelper tests', () => {
  test('get week dates works', () => {
    const dates = getWeekDates();

    expect(dates).toStrictEqual(['2022-02-27', '2022-01-31', '2022-02-01', '2022-02-02', '2022-02-03', '2022-02-04', '2022-02-05']);
  });
  test('get date works', () => {
    const date = getDate();

    expect(date).toBe('2022-03-01');
  });
});
