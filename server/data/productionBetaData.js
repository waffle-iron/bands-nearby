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
    if (item.headliner[0] !=='$' && dateArray[1] == monthNow && dateArray[2] >= dayNow && dateArray[2] <= (dayNow + 6) && item.youTube !== [] && item.similarArtists !== [] || dateArray[1] == monthNow + 1 && dateArray[2] <= 6) {
      return true;
    }
  });
};

module.exports = relevantData(data);
// module.exports = data;

