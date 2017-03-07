// programatically filters shows for today's concerts

// const data = require('./bandsNearbyData.json');
const data = require('./bandsNearbyDataMock');


const today = new Date();
const dayNow = today.getDate();
const monthNow = today.getMonth() + 1;
console.log(dayNow, 'DAY NOOOOWW')

const relevantData = (data) => {
  return data.filter((item) => {
    const dateArray = item.date.split('-');
    if (dateArray[1] == monthNow && dateArray[2] > dayNow && dateArray[2] <= dayNow + 6 && item.youTube !== [] && item.similarArtists !== []) {
      console.log(dateArray[2])
      return true;
    }
  });
};

module.exports = relevantData(data);

// module.exports = data;
