// biltmore.js is considerably slower than commadore.js because it accesses
// the Dom multiple times instead of traversing

const jsdom = require('jsdom');
const { zip } = require('lodash');

// jsdom gets html and javascript dom interactions
jsdom.env(
  'http://biltmorecabaret.com/concerts/',
  ['http://code.jquery.com/jquery.js'],
  (err, window) => {
    // function that scrapes website for fields
    const generateAllInfos = (selector, cb) => {
      return Array.from(window.document.querySelectorAll(selector)).map(cb);
    };
    // creates arrays holding show info (all dates are in one array...)
    const dates = generateAllInfos('.event-date', (date) => date.textContent);
    const link = generateAllInfos('.event-date a', (l) => l.href);
    const titles = generateAllInfos('.dp_pec_event_title_sp', (title) => title.textContent);
    const cost = generateAllInfos('#ticket_price', (price) => {
      const costIndex = price.textContent.indexOf('$');
      return price.textContent.slice(costIndex+1, costIndex + 3).trim();
    });
    const startTime = generateAllInfos('#door_info', (door) => {
      const timeIndex = door.textContent.indexOf('pm');
      const time = door.textContent.slice(timeIndex - 2, timeIndex).trim();
      return parseInt(time, 10) ? time : 'Not Available';
    });
    const photo = generateAllInfos('.dp_pec_event_photo img', (pic) => pic.src);
    const fb = generateAllInfos('.fb_btn', (l) => l.href);

    //  zips all arrays together and cuts off last two elements
    // (accounts for bad naming conventions on biltmorecabaret site)
    const allShows = zip(dates, titles, cost, startTime, link, photo, fb).slice(0, 14);

    //  creates array of show objects
    const thing = allShows.map((item, index, collection) => {
      if (collection[index][0]) {
        return {
          date: collection[index][0],
          title: collection[index][1],
          cost: collection[index][2],
          startTime: collection[index][3],
          link: collection[index][4],
          photo: collection[index][5],
          fb: collection[index][6],
          venue: 'Biltmore Cabaret',
        };
      }
    });
    setTimeout(function() {
      console.log(thing)
    }, 1000)
  }
);
