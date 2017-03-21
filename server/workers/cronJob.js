const getShows = require('./getHtml.js');
const getYouTube = require('./youTube.js');
const getSimilarArtists = require('./lastFm');
const sfScraper = require('./sf/bayBridged');
const getGoogleSearchResult = require('./googleSearchResult');
const bluebirdPromise = require('bluebird');
const util = require('util');
const fs = bluebirdPromise.promisifyAll(require("fs"));

var path = require('path');

const generateShowData = (venue) => {
  console.log('called with', venue.name)
  getShows(venue.http)
  .then((data) => venue.scraper(data, venue.name))
  .map(concert => getYouTube(concert.title, concert))
  .map(concert => getSimilarArtists(concert.title, concert))
  .map(concert => getGoogleSearchResult(concert.title, concert))
  .then((data) => {
    const allData = JSON.parse(fs.readFileSync('../data/bandsNearbyData.json').toString());
    allData.push(...data);
    const stringifyedData = JSON.stringify(allData, null, ' ');
    console.log(stringifyedData);
    fs.writeFile('../data/bandsNearbyData.json', stringifyedData, 'utf8');
  })
  .catch(data => console.error(`Handle error: error in chronjob.js + ${data}`))
};

const venues = [
  { name: 'The Chapel', http: 'http://calendar.thebaybridged.com/venues/the-chapel?page=1', scraper: sfScraper },
  // { name: 'Fox Theater', http: 'http://calendar.thebaybridged.com/venues/fox-theater', scraper: sfScraper },
  // { name: 'The Fillmore', http: 'http://calendar.thebaybridged.com/venues/the-fillmore', scraper: sfScraper },
  // { name: 'Lost Church', http: 'http://calendar.thebaybridged.com/venues/the-lost-church', scraper: sfScraper },
  // { name: 'Great American Music Hall', http: 'http://calendar.thebaybridged.com/venues/great-american-music-hall', scraper: sfScraper  },
  // { name: 'The Independent', http: 'http://calendar.thebaybridged.com/venues/the-independent', scraper: sfScraper },
  // { name: 'Bimbo\'s 365', http: 'http://calendar.thebaybridged.com/venues/bimbo-s-365-club', scraper: sfScraper },
  // { name: 'Rickshaw Stop', http: 'http://calendar.thebaybridged.com/venues/rickshaw-stop', scraper: sfScraper },
  // { name: 'Slim\'s', http: 'http://calendar.thebaybridged.com/venues/slim-s', scraper: sfScraper },
  // { name: 'The Greek Theater', http: 'http://calendar.thebaybridged.com/venues/greek-theatre', scraper: sfScraper },
  // { name: 'Sweetwater Music Hall', http: 'http://calendar.thebaybridged.com/venues/sweetwater-music-hall', scraper: sfScraper },
  // { name: 'Doc\'s Lab', http: 'http://calendar.thebaybridged.com/venues/docs-lab', scraper: sfScraper },
];

// creates bandsNearbyData file if it does not exist, archives the last version using node-fs
const runTask = (venues) => {
  fs.appendFileAsync('../data/bandsNearbyData.json', '', 'utf8')
  .then(() => fs.rename('../data/bandsNearbyData.json', `../data/archived/${JSON.stringify(new Date())}.json`))
  .then(() => fs.writeFile('../data/bandsNearbyData.json', '[]', 'utf8'))
  .then(() => {
    venues.forEach((venue, index) => {
      setTimeout(() => {
        generateShowData(venue);
      }, 20000 * index * Math.random());
    });
  });
};

runTask(venues);
