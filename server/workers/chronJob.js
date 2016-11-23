const getShows = require('./scraper.js');
const commadorScaper = require('./commador.js');
const getYouTube = require('./youTube.js');
const getSimilarArtists = require('./lastFm');
const biltmoreScraper = require('./biltmore');
const getGoogleSearchResult = require('./googleSearchResult');

getShows('http://biltmorecabaret.com/concerts/')
.then(biltmoreScraper)
.then(concertData => getShows('http://www.commodoreballroom.com/calendar/')
  .then(commadorScaper)
  .then(commadorData => commadorData.concat(concertData))
  .catch(() => console.log(`error + ${concertData}`))
)
.map(concert => getYouTube(concert.title, concert))
.map(concert => getSimilarArtists(concert.title, concert))
.map(concert => getGoogleSearchResult(concert.title, concert))
.then(stuff => console.log(stuff));
