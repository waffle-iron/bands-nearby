const jsdom = require('jsdom');

const amnesiaScraper = (window) => {
  const events = window.document.querySelectorAll('.tribe_events');
  const eventsArray = Array.from(events);

  return eventsArray.map((event) => {
    const data = event.getAttribute('data-tribejson');
    const scrapedData = JSON.parse(data);

    const reClosed = /Closed/gi;
    if (reClosed.test(scrapedData.title)) {
      return;
    }

    const reTitle = /:\s(.*)/g;
    let title = reTitle.exec(scrapedData.title);
    title = title[1];

    const reCost = /\$(\d+)/g;
    let cost = reCost.exec(scrapedData.excerpt);
    cost === null ? cost = 'No Cover' : cost = cost[1];

    const reStartTime = /(\d+):(\d+)/g;
    let startTime = reStartTime.exec(scrapedData.startTime);
    startTime = startTime[1];

    const reDate = /.*(?=\s@)/gi;
    let date = reDate.exec(scrapedData.startTime);
    date = date[1];

    const show = {};
    show.title = title;
    show.date = date;
    show.startTime = startTime;
    show.cost = cost;
    show.artistSummary = scrapedData.excerpt;
    show.link = scrapedData.permalink;
    return show;
  });
};

module.exports = amnesiaScraper;
