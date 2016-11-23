const jsdom = require('jsdom');

const commadorScaper = (window) => {
  const concertsInDom = window.document.querySelectorAll('.row.ticket-row');
  return Array.from(concertsInDom).map((concert) => {
    const concertObj = {};
    let node = concert;
    const queue = [];
    let queueIndex = 0;
    while (node) {
      if (node.className === 'ticket_details') {
        const data = node.textContent.trim();
        const dataClean = data.split('\t');
        concertObj.date = dataClean[0];
        concertObj.title = dataClean[dataClean.length - 1].split(',')[0];
      }
      if (node.className === 'ticket_meta') {
        const costIndex = node.textContent.indexOf('$');
        concertObj.cost = node.textContent.slice(costIndex + 1, costIndex + 3);
        const startTimeIndex = node.textContent.indexOf('Show');
        const time = node.textContent.slice(startTimeIndex + 5, startTimeIndex + 9);
        parseInt(time, 10) ? concertObj.startTime = time : concertObj.startTime = 'Not Available';
      }
      if (node.className === 'attachment-ticket-thumb size-ticket-thumb wp-post-image') {
        concertObj.photo = node.src;
        concertObj.link = 'http://www.commodoreballroom.com/calendar/';
        concertObj.venue = 'Commodore Ballroom';
      }
      for (const childNode of node.childNodes) {
        queue.push(childNode);
      }
      node = queue[queueIndex];
      queueIndex += 1;
    }
    return concertObj;
  });
};

module.exports = commadorScaper;
