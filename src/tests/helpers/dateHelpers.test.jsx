import '@testing-library/jest-dom/extend-expect';
import { getWeekDates, getDate } from '../../helpers/dateHelpers';

beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(1091040026000));
});

describe('datehelper tests', () => {
  test('get week dates works', () => {
    const dates = getWeekDates();

    expect(dates).toStrictEqual(['2004-07-26', '2004-07-27', '2004-07-28', '2004-07-29', '2004-07-30', '2004-07-31', '2004-08-01']);
  });
  test('get date works', () => {
    const date = getDate();

    expect(date).toBe('2004-07-28');
  });
});
