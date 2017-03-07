const fetchURL = require('./fetch');
const APIKey = require('./APIKeys');

const getYouTube = (concertTitle, concertObj) => {
  let searchTerm = concertTitle[0].trim().split(' ').join('%20');
  searchTerm = searchTerm.replace(/’s/g, '');
  searchTerm = searchTerm.replace(/’/g, '');
  searchTerm = searchTerm.replace(/"/g, '');
  searchTerm = searchTerm.toString();
  const URL = `https://www.googleapis.com/youtube/v3/search?key=${APIKey.YOUTUBE}&part=snippet&maxResults=9&q=%22${searchTerm}%22music%22live&{videoEmbeddable:true}`;
  return fetchURL(URL)
  .then((youTubeArtistSummary) => {
    return youTubeArtistSummary.items.reduce((acc, item) => {
      if (item.id.videoId) {
        acc.push(item.id.videoId);
      }
      return acc;
    }, []);
  })
  .then((videos) => {
    concertObj.youTube = videos.slice(0, 2);
    return concertObj;
  })
  .catch((data) => {
    console.error('Error Handling: youTube.js error', searchTerm);
    concertObj.youTube = [];
    return concertObj;
  });
};

module.exports = getYouTube;
