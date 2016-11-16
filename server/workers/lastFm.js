const fetchURL = require('./fetch');

// AB: couldn't move these more than one file directory up--wanted to put them in config folder
const APIKey = require('./APIKeys');

const getSoundsLike = (concertTitle, concertObj) => {
  const URL = `http://ws.audioscrobbler.com/2.0?method=artist.getinfo&artist=${concertTitle}&api_key=${APIKey.LASTFM}&format=json`;
  return fetchURL(URL)
  .then(function(artistInfo) {
    //lastFM's API returns 200 status code for artists not found error so not handled by fetch catch;
    if (!Object.keys(artistInfo).includes('error')) {
      return [artistInfo].map(artist => {
        if (artist) {
          return artist.artist.similar.artist.map(similarArtists => {
            return similarArtists.name;
          })
        }
      })
    }
  })
  .then(function(similarArtistsArray) {
    concertObj.similarArtists = similarArtistsArray[0]
    return concertObj
  })
  .catch(function(err) {
    concertObj.similarArtists = []
    return concertObj
  })
}

module.exports = getSoundsLike;
