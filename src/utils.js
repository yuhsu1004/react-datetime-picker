import moment from 'moment';

export const getAllDaysInMonth = m => {
  const prevMonth = moment(m).startOf('month').startOf('week');
  const nextMonth = moment(m).endOf('month').endOf('week');
  const daysInMonth = moment(m).daysInMonth();

  const result = [];

  while (nextMonth.month() !== m.month()) {
    result.unshift(moment(m).month(nextMonth.month()).date(nextMonth.date()));
    nextMonth.subtract(1, 'day');
  }

  let i = daysInMonth + 1;
  while (i > 1) {
    i--;
    result.unshift(moment(m).date(i));
  }

  while (prevMonth.month() !== m.month()) {
    result.unshift(moment(m).month(prevMonth.month()).date(prevMonth.date()));
    prevMonth.add(1, 'day');
  }

  return result;
};

export const getRangeArray = (start, end) => {
  const arr = [];
  for (let i = start; i < end; i++) {
    arr.push(i);
  }
  return arr;
};
