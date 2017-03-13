export const isSmallScreen = () => !window.matchMedia("(max-width: 667px)").matches ? false : true;

export const dayToEnglish = (date) => {
  const dateObj = new Date(date);
  let day = dateObj.getUTCDay();

  const numToWord = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  return numToWord[day];
};

export const isFree = (price) => price == 0 ? "No Cover" : `Price $${price}`;
