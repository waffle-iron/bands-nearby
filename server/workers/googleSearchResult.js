const getShows = require('./scraper.js');


const getGoogleSearchResult = (concertTitle, concertObj) => {
  const searchTerm = concertTitle.split(' ').join('+');
  return getShows(`https://www.google.ca/search?q=+music+${searchTerm}`)
  .then(function(window) {
    const googleSummary = window.document.querySelector('.st').textContent;
    const firstLine = googleSummary.split('. ')[0]
    return firstLine
  })
  .then(function(googleInfo) {
      if (concertObj.artistSummary === '') {
        concertObj.artistSummary = googleInfo
        return concertObj
      } else {
        return concertObj
      }
  })
  .catch(function(err) {
    concertObj.artistSummary = ''
    return concertObj
  })
}


module.exports = getGoogleSearchResult;
