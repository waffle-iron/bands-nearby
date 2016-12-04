const fetchURL = require('./fetch');

// AB: couldn't move these more than one file directory up--wanted to put them in config folder
const APIKey = require('./APIKeys');

const getSoundsLike = (concertTitle, concertObj) => {
  const URL = `http://ws.audioscrobbler.com/2.0?method=artist.getinfo&artist=${concertTitle}&api_key=${APIKey.LASTFM}&format=json`;
  return fetchURL(URL)
  .then((artistInfo) => {
    // lastFM's API returns 200 status code for artists not found error so not handled by fetch catch;
    if (!Object.keys(artistInfo).includes('error')) {
      const similarArtists = [artistInfo].map((artist) => {
        // if (artist) {
          return artist.artist.similar.artist.map(simArtists => simArtists.name);
        // }
      });
      const artistSummary = [artistInfo].map((artist) => {
        // if (artist) {
          return artist.artist.bio.summary;
        // }
      });
      const lastFMObj = {};
      lastFMObj.similarArtistsArray = similarArtists;
      lastFMObj.artistSummary = artistSummary[0].split(' <a');
      return lastFMObj;
    }
  })
  .then((lastFMObj) => {
    concertObj.similarArtists = lastFMObj.similarArtistsArray[0];
    concertObj.artistSummary = lastFMObj.artistSummary[0];
    return concertObj;
  })
  .catch(() => {
    concertObj.similarArtists = [];
    return concertObj;
  });
};

module.exports = getSoundsLike;
