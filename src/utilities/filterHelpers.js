export const sortByDate = (concerts) => {
  const makeDateArray = string => string.split('-');
  return concerts.sort((a, b) => {
    const show1 = makeDateArray(a.date);
    const show2 = makeDateArray(b.date);
    if (show1[1] > show2[1]) {
      return 1;
    } else if (show1[1] === show2[1]) {
      if (show1[2] > show2[2]) {
        return 1;
      }
      return -1;
    }
    return -1;
  });
};

export const findMinMax = (concerts) => {
  return concerts.reduce((costArray, item) => {
    item.cost < costArray[0] ? costArray[0] = item.cost : null;
    item.cost > costArray[1] ? costArray[1] = item.cost : null;
    return costArray;
  }, [Infinity, -Infinity]);
};

export const filterByCost = (concerts, maxPrice) => {
  if (!maxPrice) {
    maxPrice = Infinity;
  }
  return concerts.filter(concert => concert.cost <= maxPrice || typeof concert.cost === 'string');
};

// add typeahead filters here:
export const filterByTypeahead = (concerts, wordToMatch) => {
  return concerts.filter((concert) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return concert.title.join('').match(regex) || concert.similarArtists.join('').match(regex) || concert.venue.match(regex);
  });
};

export const filteredMatches = (concerts, wordToMatch, maxPrice) => {
  const typeMatch = filterByTypeahead(concerts, wordToMatch);
  return filterByCost(typeMatch, maxPrice);
};

export const displayMatches = (concertData, typeAheadSearch, costSearch, handleFilters) => {
  const filtered = filteredMatches(concertData, typeAheadSearch, costSearch);
  return handleFilters(filtered);
};


//
//
// const relaventShow = (month) => {
//   let isRelavent = false;
//   const inputMonth = month.toUpperCase();
//
//   const monthMap = {
//     0: 'JAN',
//     1: 'FEB',
//     2: 'MAR',
//     3: 'APR',
//     4: 'MAY',
//     5: 'JUN',
//     6: 'JUL',
//     7: 'AUG',
//     8: 'SEP',
//     9: 'OCT',
//     10: 'NOV',
//     11: 'DEC',
//   };
//
//   const date = new Date();
//   const curMonthNum = date.getMonth();
//   const currentMonth = monthMap[curMonthNum];
//   const nextMonth = monthMap[curMonthNum + 1];
//
//   if (inputMonth === currentMonth || inputMonth === nextMonth) {
//     isRelavent = true;
//   }
//
//   return isRelavent;
// };
