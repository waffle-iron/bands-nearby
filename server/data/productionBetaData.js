// programatically filters shows for today's concerts

const data = require('./bandsNearbyData');
const today = new Date();
const dayNow = today.getDate();
const monthNow = today.getMonth() + 1;

const relevantData = (data) => {
  return data.filter((item) => {
    const dateArray = item.date.split('-');
    return dateArray[1] == monthNow && dateArray[2] == dayNow;
  });
};

module.exports = relevantData(data);
