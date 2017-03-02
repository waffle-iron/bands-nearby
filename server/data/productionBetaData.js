// programatically filters shows for today's concerts

const data = require('./bandsNearbyData');
// const data = require('./bandsNearbyDataMock');


const today = new Date();
const dayNow = today.getDate();
const monthNow = today.getMonth() + 1;

const relevantData = (data) => {
  return data.filter((item) => {
    const dateArray = item.date.split('-');
    if (dateArray[1] == monthNow && dateArray[2] >= dayNow && dateArray[2] <= dayNow + 3) {
      return true;
    }
  });
};

module.exports = relevantData(data);

// module.exports = data;
