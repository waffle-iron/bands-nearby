const jsdom = require('jsdom');
const bluebirdPromise = require('bluebird');

const getShows = function(url) {
  return new bluebirdPromise(function(resolve, reject) {
    jsdom.env(
      url,
      ['http://code.jquery.com/jquery.js'],
      (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res);
        }
      }
    );
  })
};

module.exports = getShows;
