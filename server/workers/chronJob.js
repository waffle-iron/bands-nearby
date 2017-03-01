const getShows = require('./scraper.js');
const getYouTube = require('./youTube.js');
const getSimilarArtists = require('./lastFm');
const sfScraper = require('./sf/chapel');
const getGoogleSearchResult = require('./googleSearchResult');
const fs = require('fs');
const chalk = require('chalk');

const cleanData = (data) => {
  return data.reduce((entries, entry) => {
    if (entry) {
      entries.push(entry)
    }
    return entries;
  }, [])
};

const generateShowData = (venues) => {
  venues.forEach((venue) => {
    setTimeout(function() {
      getShows(venue.http)
      .then((data) => sfScraper(data, venue.name))
      // .catch((data) => console.log(`error + ${concertData}`))
      .map(concert => getYouTube(concert.title, concert))
      // .then(cleanData)
      // .map(concert => getSimilarArtists(concert.title, concert))
      // .then(cleanData)
      // .map(concert => getGoogleSearchResult(concert.title, concert))
      .then(function(data) {
        console.log(data)
        // const stringData = JSON.stringify(data);
        //
        // fs.writeFile('dataFile.txt', stringData, 'utf8')
      })
    }, 1)
  })
}

const venues = [
  { name: 'Chapel', http: 'http://calendar.thebaybridged.com/venues/the-chapel?page=1' },
  // { name: 'Fox Theater', http: 'http://calendar.thebaybridged.com/venues/fox-theater' },
];

generateShowData(venues);
