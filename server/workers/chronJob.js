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
  fs.rename('bandsNearbyData.json', JSON.stringify(new Date()));
  const allData = [];
  venues.forEach((venue, index, collection) => {
    setTimeout(function() {
      getShows(venue.http)
      .then((data) => sfScraper(data, venue.name))
      .map(concert => getYouTube(concert.title, concert))
      .then(cleanData)
      .map(concert => getSimilarArtists(concert.title, concert))
      // .then(cleanData)
      // .map(concert => getGoogleSearchResult(concert.title, concert))
      .then(function(data) {
        allData.push(...data)
        return allData;
      })
      .then(function(data) {
        if (index === collection.length - 1) {
          const stringifyedData = JSON.stringify(data, null, ' ');
          fs.appendFile('bandsNearbyData.json', stringifyedData, 'utf8')
        }
      })
      .catch((data) => console.log(`Handle error: error in chronjob.js + ${concertData}`))
    }, 1)
  })
}

const venues = [
  { name: 'Chapel', http: 'http://calendar.thebaybridged.com/venues/the-chapel?page=1' },
  { name: 'Fox Theater', http: 'http://calendar.thebaybridged.com/venues/fox-theater' },
];

generateShowData(venues);
