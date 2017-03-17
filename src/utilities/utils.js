export const isSmallScreen = () => !window.matchMedia('(max-width: 600px)').matches ? false : true;

export const dayToEnglish = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getUTCDay();

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

export const isCover = (cost) => {
  return cost !== 0 && cost === cost ? cost = `$${cost}` : cost = 'No Cover';
};

// bands title must be less than six words
export const textClamp = (text) => {
  if (!window.matchMedia('(min-width: 667px)').matches) {
    return text.split(' ').slice(0, 3).join(' ');
  }
  return text.split(' ').slice(0, 5).join(' ');
};
