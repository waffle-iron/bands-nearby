const getShows = require('./scraper.js');
const commadorScaper = require('./commador.js');
const getYouTube = require('./youTube.js');
const getSimilarArtists = require('./lastFm')
const biltmoreScraper = require('./biltmore')
const getGoogleSearchResult = require('./googleSearchResult')

getShows('http://biltmorecabaret.com/concerts/')
.then(biltmoreScraper)
.then(function(concertData) {
  return getShows('http://www.commodoreballroom.com/calendar/')
  .then(commadorScaper)
  .then(function(commadorData) {
    return commadorData.concat(concertData)
  })
})
.map(function(concert) {
  return getYouTube(concert.title, concert)
})
.map(function(concert) {
  return getSimilarArtists(concert.title, concert)
})
.map(function(concert) {
  return getGoogleSearchResult(concert.title, concert)
})

// .map(function(concert) {
//   return getYouTube(concert.title, concert)
// })
// .map(function(concert) {
//   return getSimilarArtists(concert.title, concert)
// })
.then(function(stuff) {
  //put into database
  console.log(stuff)
})
//
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
//   return getYouTube(concert.title, concert)
// })
//
// // .map(function(concert) {
// //   return getYouTube(concert.title, concert)
// // })
// // .map(function(concert) {
// //   return getSimilarArtists(concert.title, concert)
// // })
// .then(function(stuff) {
//   //put into database
//   // console.log(stuff)
// })




  // var request1 = require('request');
  // request('https://www.google.ca/search?q=adam+baldwin+music&cad=h', function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     console.log(response.querySelector('.st')) // Show the HTML for the Google homepage.
  //   }
  // })
