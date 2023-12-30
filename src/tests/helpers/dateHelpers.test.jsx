import '@testing-library/jest-dom/extend-expect';
import { getWeekDates, getDate } from '../../helpers/dateHelpers';

beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(1091040026000));
});

describe('datehelper tests', () => {
  test('get date works', () => {
    const date = getDate();

    expect(date).toBe('2004-07-28');
  });
});
