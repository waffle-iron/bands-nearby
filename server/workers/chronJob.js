// const getShows = require('./scraper.js');
// const getYouTube = require('./youTube.js');
// const getSimilarArtists = require('./lastFm');
// // const amnesiaScraper = require('./sf/amnesia');
const chapelScraper = require('./sf/chapel');
// const getGoogleSearchResult = require('./googleSearchResult');
// const biltmoreScraper = require('./vancouver/biltmore');
//
//
// getShows('http://calendar.thebaybridged.com/venues/the-chapel?page=1')
// .then(chapelScraper)
// // .then(concertData => getShows('http://www.commodoreballroom.com/calendar/')
// //   .then(commadorScaper)
// //   .then(commadorData => commadorData.concat(concertData))
// //   .catch(() => console.log(`error + ${concertData}`))
// // )
// .map(concert => getYouTube(concert.title, concert))
// .map(concert => getSimilarArtists(concert.title, concert))
// .map(concert => getGoogleSearchResult(concert.title, concert))
// .then(stuff => console.log(stuff));


const getShows = require('./scraper.js');
// const commadorScaper = require('./commador.js');
const getYouTube = require('./youTube.js');
const getSimilarArtists = require('./lastFm')
const biltmoreScraper = require('./vancouver/biltmore')
const getGoogleSearchResult = require('./googleSearchResult')

getShows('http://calendar.thebaybridged.com/venues/the-chapel?page=1')
.then(chapelScraper)
// getShows('http://biltmorecabaret.com/concerts/')
// .then(biltmoreScraper)
// .then(function(concertData) {
//   return getShows('http://www.commodoreballroom.com/calendar/')
//   .then(commadorScaper)
//   .then(function(commadorData) {
//     return commadorData.concat(concertData)
//   })
// })
// .map(function(concert) {
//   return getYouTube(concert.headliner, concert)
// })
// .map(function(concert) {
//   return getSimilarArtists(concert.headliner, concert)
// })
// .map(function(concert) {
//   return getGoogleSearchResult(concert.title, concert)
// })
.then(function(data) {
  return data.reduce((entries, entry) => {
    if (entry) {
      entries.push(entry)
    }
    return entries;
  }, [])
})
.map(function(concert) {
  return getYouTube(concert.title, concert)
})
.then(function(data) {
  return data.reduce((entries, entry) => {
    if (entry) {
      entries.push(entry)
    }
    return entries;
  }, [])
})
.map(function(concert) {
  return getSimilarArtists(concert.title, concert)
})
.then(function(data) {
  return data.reduce((entries, entry) => {
    if (entry) {
      entries.push(entry)
    }
    return entries;
  }, [])
})
.then(function(goodData) {
  console.log(goodData)
})
