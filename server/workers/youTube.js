const fetchURL = require('./fetch');
const APIKey = require('./APIKeys');

const getYouTube = (concertTitle, concertObj) => {
  const searchTerm = concertTitle.split(' ').join('%22');
  const URL = `https://www.googleapis.com/youtube/v3/search?key=${APIKey.YOUTUBE}&part=snippet&maxResults=9&q=%22${searchTerm}%22music%22live%22&{videoEmbeddable:true}`;
 return fetchURL(URL)
  .then(function(video) {
    return video.items.map(vid => {
      return vid.id.videoId
    })
  })
  .then(function(youTubeArray) {
    concertObj.youTube = youTubeArray.slice(0, 2)
    return concertObj
  })
}

module.exports = getYouTube;
