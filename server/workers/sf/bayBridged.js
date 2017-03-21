const jsdom = require('jsdom');
const getShows = require('../getHtml.js');
const bluebirdPromise = require('bluebird');

const chapelScraper = (window, venue) => {
  const getSummaryLinks = (window) => {
    const summaryLinkElements = window.document.querySelectorAll('a.ds-listing-event-title.url.summary');
    const summaryLinkElementsArray = Array.from(summaryLinkElements);

    return summaryLinkElementsArray.reduce((events, event) => {
      if (event.href.includes('oysters') || event.href.includes('beer')) {
        return events;
      }
      events.push(event.href);
      return events;
    }, []);
  };

  const scrapeEachLink = (arrayOfLinks) => {
    return bluebirdPromise.map(overviewURL, (showDetailsURL) => {
      return getShows(showDetailsURL)
      .then(window => {
        const scrapedTitle = window.document.querySelector('.ds-event-title-text').textContent;
        const reTitle = /(.*):/g;
        let title = reTitle.exec(scrapedTitle);
        title === null ? title = scrapedTitle : title = title[1];
        if (title.includes(',')) {
          title = title.split(',')
        } else {
          title = [title];
        }

        let headliner = title[0];


        let scrapedPhoto = window.document.querySelector('.ds-cover-image');
        let scrapedPhotoURL = scrapedPhoto.style['background-image'];
        const rePhoto = /\((.*)\)/g;
        let photo = rePhoto.exec(scrapedPhotoURL);
        photo === null ? photo = null : photo = photo[1];

        const scrapedCost = window.document.querySelector('.ds-ticket-info').textContent;
        const reCost = /\$(\d+)/g;
        let cost = reCost.exec(scrapedCost);
        cost === null ? cost = 0 : cost = parseInt(cost[1]);

        const scrapedStartTime = window.document.querySelector('.ds-event-time');
        const reStartTime = /(\d+):(\d+)/g;
        let startTime = reStartTime.exec(scrapedStartTime.textContent);
        startTime === null ? startTime = scrapedStartTime.textContent : startTime = startTime[0];

        const scrapedDate = scrapedStartTime.firstElementChild.getAttribute('data-datetime')
        const reDate = /(.*)(?=\s)/gi
        let date = reDate.exec(scrapedDate);
        date === null ? date = date : date = date[1];

        var scrapedArtistSummary = window.document.querySelectorAll('.ds-event-description-inner p');
        var paragraphArray = Array.from(scrapedArtistSummary)
        var firstParagraph = paragraphArray.reduce((acc, item) => {
          if (!acc[0] && item.textContent) {
            acc.push(item.textContent)
          }
          return acc;
        }, [])
        if (firstParagraph[0]) {
          scrapedArtistSummary = firstParagraph[0];
        } else {
          scrapedArtistSummary = window.document.querySelector('.ds-event-description-inner').textContent;
        }

          // var scrapedArtistSummary = 'hello';


        const artistSummary = scrapedArtistSummary.replace(title[0], '').trim()

        const scrapedLink = window.document.querySelector('.ds-buy-tix.tickets');
        let link = scrapedLink;
        scrapedLink === null ? link = null : link = link.href;

        const show = {};
        show.venue = venue;
        show.title = title;
        show.headliner = headliner;
        show.date = date;
        show.startTime = startTime;
        show.cost = cost;
        show.artistSummary = artistSummary;
        show.photo = photo;
        show.link = link;
        return show;
      });
    });
  };

  const overviewURL = getSummaryLinks(window);
  return scrapeEachLink(overviewURL);
};

module.exports = chapelScraper;
