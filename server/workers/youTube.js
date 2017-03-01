const fetchURL = require('./fetch');
const APIKey = require('./APIKeys');

const getYouTube = (concertTitle, concertObj) => {
  let searchTerm = concertTitle[0].trim().split(' ').join('%22');
  const URL = `https://www.googleapis.com/youtube/v3/search?key=${APIKey.YOUTUBE}&part=snippet&maxResults=9&q=%22${searchTerm}%22music%22live%22&{videoEmbeddable:true}`;
 return fetchURL(URL)
 .then(function(youTubeArtistSummary) {
     return youTubeArtistSummary.items.filter((videos) => {
       return videos.id.videoId[0]
     })
   })
   .then(function(videos) {
     return videos.map(video => {
       return video.id.videoId
     })
   })
  .then(function(videos) {
    concertObj.youTube = videos.slice(0, 2)
    return concertObj
  })
  .catch(() => {
    console.log('Error Handling: youTube.js error', searchTerm)
  });
}

module.exports = getYouTube;
