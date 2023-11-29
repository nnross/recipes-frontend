/**
 * Gets current week in sql Dates
 * @returns current weeks dates.
 */
export const getWeekDates = () => {
  const date = new Date();
  const dDay = date.getDay();
  const first = date.getDate() - dDay + 1;
  const week = [];
  for (let i = 0; i < 7; i += 1) {
    week.push(new Date(date.setDate(first + i)).toISOString().slice(0, 10).replace('T', ' '));
  }
  return week;
};

export const getDate = () => new Date().toISOString().slice(0, 10).replace('T', ' ');
