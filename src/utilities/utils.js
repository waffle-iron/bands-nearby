const relaventShow = (month) => {
  let isRelavent = false;
  const inputMonth = month.toUpperCase();

  const monthMap = {
    0: 'JAN',
    1: 'FEB',
    2: 'MAR',
    3: 'APR',
    4: 'MAY',
    5: 'JUN',
    6: 'JUL',
    7: 'AUG',
    8: 'SEP',
    9: 'OCT',
    10: 'NOV',
    11: 'DEC',
  };

  const date = new Date();
  const curMonthNum = date.getMonth();
  const currentMonth = monthMap[curMonthNum];
  const nextMonth = monthMap[curMonthNum + 1];

  if (inputMonth === currentMonth || inputMonth === nextMonth) {
    isRelavent = true;
  }

  return isRelavent;
};
