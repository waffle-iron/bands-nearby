const jsdom = require('jsdom');
const { zip } = require('lodash');


// jsdom gets html and javascript dom interactions
jsdom.env(
  "http://foxcabaret.com/calendar",
  ["http://code.jquery.com/jquery.js"],
  function (err, window) {

    const showUrls = Array.from(window.document.querySelectorAll('a.url')).map(show => show.href);

  }
);

jsdom.env(
  "http://www.foxcabaret.com/event/publish-the-quest-with-special-guest-john-welsh-band/",
  ["http://code.jquery.com/jquery.js"],
  function (err, window) {
    // const title = console.log(window.document.querySelector('.tribe-events-single-event-title.summary.entry-title').innerHTML)

//start
  // console.log(window.document.querySelector('.date-start.dtstart').textContent)

//end
  // console.log(window.document.querySelector('.end-time.dtend').textContent)

//price
  // console.log(window.document.querySelector('.tribe-events-cost').textContent)

//image
  console.log(window.document.querySelector('.tribe-events-event-image img').src)



    // console.log(Array.from(window.document.querySelectorAll('.tribe-events-single-event-title.summary.entry-title')).map(item => {
    //   for (var key in item) {
    //     console.log(key, item[key])
    //   }
    // }))

    // const showUrls = Array.from(window.document.querySelectorAll('a.url')).map(show => show.href);

  }
);




// console.log(Array.from(window.document.querySelectorAll('a.url')).map(item => {
//   for (var key in item) {
//     console.log(key, item[key])
//   }
// }))


//
// //function that scrapes website for fields
// const generateAllInfos = (selector, cb) => {
//   return Array.from(window.document.querySelectorAll(selector)).map(cb)
// }
//
// //creates arrays holding show info (all dates are in one array...)
// const dates = generateAllInfos('.event-date', (date) => date.textContent)
// const link = generateAllInfos('a.url', (link) => link.href)
// const titles = generateAllInfos('.dp_pec_event_title_sp', (title) => title.textContent)
// const cost = generateAllInfos('#ticket_price', (price) => price.textContent)
// const door = generateAllInfos('#door_info', (door) => door.textContent)
// const photo = generateAllInfos('.dp_pec_event_photo img', (photo) => photo.src)
// const fb = generateAllInfos('.fb_btn', (link) => link.href)
//
// //zips all arrays together and cuts off last two elements (accounts for bad naming conventions on biltmorecabaret site)
// const allShows = zip(dates, titles, cost, door, link, photo, fb).slice(0, 14)
//
// //creates array of show objects
// const thing = allShows.map((item, index, collection) => {
//   if (collection[index][0]) {
//     return {
//       date: collection[index][0],
//       title: collection[index][1],
//       cost: collection[index][2],
//       door: collection[index][3],
//       link: collection[index][4],
//       fb: collection[index][5],
//       photo: collection[index][6],
//       venue: 'Biltmore Cabaret'
//     }
//   }
// })
// setTimeout(function() {
//   console.log(thing)
// }, 1000)
