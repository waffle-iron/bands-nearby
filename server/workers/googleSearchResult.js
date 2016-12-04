const getShows = require('./scraper.js');


const getGoogleSearchResult = (concertTitle, concertObj) => {
  const searchTerm = concertTitle.split(' ').join('+');
  return getShows(`https://www.google.ca/search?q=+music+${searchTerm}`)
  .then((window) => {
    const googleSummary = window.document.querySelector('.st').textContent;
    const firstLine = googleSummary.split('. ')[0];
    return firstLine;
  })
  .then((googleInfo) => {
    if (concertObj.artistSummary === '') {
      concertObj.artistSummary = googleInfo;
      return concertObj;
    }
    return concertObj;
  })
  .catch(() => concertObj);
};

module.exports = getGoogleSearchResult;
