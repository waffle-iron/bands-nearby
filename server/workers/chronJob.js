const getShows = require('./scraper.js');
const getYouTube = require('./youTube.js');
const getSimilarArtists = require('./lastFm');
const sfScraper = require('./sf/bayBridged');
const getGoogleSearchResult = require('./googleSearchResult');
const fs = require('fs');


const cleanData = (data) => {
  return data.reduce((entries, entry) => {
    if (entry) {
      entries.push(entry)
    }
    return entries;
  }, [])
};

const generateShowData = (venue) => {
  console.log('called with', venue.name)
  getShows(venue.http)
  .then((data) => sfScraper(data, venue.name))
  .map(concert => getYouTube(concert.title, concert))
  // .then(cleanData)
  .map(concert => getSimilarArtists(concert.title, concert))
  // .then(cleanData)
  // .map(concert => getGoogleSearchResult(concert.title, concert))
  .then(function(data) {
    const allData = JSON.parse(fs.readFileSync('../data/bandsNearbyData.json').toString());
    allData.push(...data)
    const stringifyedData = JSON.stringify(allData, null, ' ');
    console.log(stringifyedData)
    fs.writeFile('../data/bandsNearbyData.json', stringifyedData, 'utf8');
  })
  .catch((data) => console.log(`Handle error: error in chronjob.js + ${data}`))
}

const venues = [
  { name: 'The Chapel', http: 'http://calendar.thebaybridged.com/venues/the-chapel?page=1'},
  { name: 'Fox Theater', http: 'http://calendar.thebaybridged.com/venues/fox-theater' },
  { name: 'The Fillmore', http: 'http://calendar.thebaybridged.com/venues/the-fillmore' },
  { name: 'Lost Church', http: 'http://calendar.thebaybridged.com/venues/the-lost-church' },
  { name: 'Great American Music Hall', http: 'http://calendar.thebaybridged.com/venues/great-american-music-hall' },
  { name: 'The Independent', http: 'http://calendar.thebaybridged.com/venues/the-independent' },
  { name: 'Thee Parkside', http: 'http://calendar.thebaybridged.com/venues/thee-parkside' },
  { name: 'Bimbo\'s 365', http: 'http://calendar.thebaybridged.com/venues/bimbo-s-365-club' },
  { name: 'Rickshaw Stop', http: 'http://calendar.thebaybridged.com/venues/rickshaw-stop' },
  { name: 'Slim\'s', http: 'http://calendar.thebaybridged.com/venues/slim-s' },
  { name: 'The Greek Theater', http: 'http://calendar.thebaybridged.com/venues/greek-theatre' },
  { name: 'Sweetwater Music Hall', http: 'http://calendar.thebaybridged.com/venues/sweetwater-music-hall' },
  { name: 'Doc\'s Lab', http: 'http://calendar.thebaybridged.com/venues/docs-lab' },
];

// { name: 'Yoshi\'s', http: 'http://calendar.thebaybridged.com/venues/yoshi-s-oakland' },
// { name: 'Davies Symphony Hall', http: 'http://calendar.thebaybridged.com/venues/davies-symphony-hall' },
// { name: 'DNA Lounge', http: 'http://calendar.thebaybridged.com/venues/dna-lounge' },
// { name: 'The New Parish', http: 'http://calendar.thebaybridged.com/venues/the-new-parish' },
// { name: 'Moe\'s Alley', http: 'http://calendar.thebaybridged.com/venues/moe-s-alley' },
// { name: 'The Hotel Utah Saloon', http: 'http://calendar.thebaybridged.com/venues/the-hotel-utah-saloon' },
// { name: 'Social Hall', http: 'http://calendar.thebaybridged.com/venues/social-hall-sf' },
// { name: 'Monarch', http: 'http://calendar.thebaybridged.com/venues/monarch' },

// bad
// { name: 'The Catalyst', http: 'http://calendar.thebaybridged.com/venues/the-catalyst' },
// { name: 'Hemlock Tavern', http: 'http://calendar.thebaybridged.com/venues/hemlock-tavern' },


// creates bandsNearbyData file if it does not exist, archives the last version
// scrapes site every 20 seconds for new data
const runTask = (venues) => {
  fs.appendFile('../data/bandsNearbyData.json', '', 'utf8')
  fs.rename('../data/bandsNearbyData.json', '../data/archived/' + JSON.stringify(new Date()) + '.json');
  fs.writeFile('../data/bandsNearbyData.json', '[]', 'utf8');
  venues.forEach((venue, index) => {
    setTimeout(() => {
      generateShowData(venue);
    }, 20000 * index)
  })
};

runTask(venues);
