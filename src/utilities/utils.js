export const isSmallScreen = () => !window.matchMedia("(max-width: 667px)").matches ? false : true;

export const dayToEnglish = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDay();
  const numToWord = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  }
  return numToWord[day];
}
