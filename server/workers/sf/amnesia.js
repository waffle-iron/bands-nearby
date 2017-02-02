const jsdom = require('jsdom');



// { photo: 'http://www.commodoreballroom.com/wp-content/uploads/2016/09/Wintersleep-Photo-230x170.jpg',
//     link: 'http://www.commodoreballroom.com/calendar/',
//     venue: 'Commodore Ballroom',
//     date: 'Saturday, November 19, 2016',
//     title: 'Fake Palms',
//     cost: '25',
//     startTime: '9:30',
//     youTube: [ 'jkgDvLA4kYw', '5u_vXkQg0OI' ],
//     similarArtists:
//      [ 'Greys',
//        'Corsica Arts Club',
//        'Mike Krol',
//        'HSY',
//        'White Reaper' ],
//     artistSummary: 'Fake Palms are a Toronto-based band signed to Buzz Records' },




const amnesiaScraper = (window) => {
  const events = window.document.querySelectorAll('.tribe_events');
  const eventsArray = Array.from(events);

  return eventsArray.map((event) => {
    data = event.getAttribute('data-tribejson')
    scrapedData = JSON.parse(data);

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
    startTime  = startTime[1];

    const reDate = /.*(?=\s@)/gi
    let date = reDate.exec(scrapedData.startTime);
    date  = date[1];

    const show = {};
    show.title = title;
    show.date = date;
    show.startTime = startTime;
    show.cost = cost;
    show.artistSummary = scrapedData.excerpt;
    show.link = scrapedData.permalink
    return show;
  });
};

module.exports = amnesiaScraper;
