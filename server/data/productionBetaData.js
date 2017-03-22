// programatically filters shows for today's concerts
// npm run build script does not work with es6 arrow functions in this file

const data = require('./bandsNearbyData.json');
// const data = require('./crossbrowserTestData');


const today = new Date();
const dayNow = today.getDate()
const monthNow = today.getMonth() + 1;

const relevantData = function(data) {
  return data.filter(function(item) {
    const dateArray = item.date.split('-');
    if (dateArray[1] == monthNow && dateArray[2] >= dayNow && dateArray[2] <= (dayNow + 6) && item.youTube !== [] && item.similarArtists !== []) {
      return true;
    }
  });
};

module.exports = relevantData(data);
// module.exports = data;
