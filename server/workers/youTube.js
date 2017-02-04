// const fetchURL = require('./fetch');
// const APIKey = require('./APIKeys');
//
// const getYouTube = (concertTitle, concertObj, index = 0) => {
//   let bandName = concertTitle[0];
//   if (Array.isArray(concertTitle)) {
//     bandName = concertTitle[index];
//   }
//   const searchTerm = concertTitle.split(' ').join('%22');
//   const URL = `https://www.googleapis.com/youtube/v3/search?key=${APIKey.YOUTUBE}&part=snippet&maxResults=9&q=%22${searchTerm}%22music%22live%22&{videoEmbeddable:true}`;
//
//
//
//  return fetchURL(URL)
//  .then(function(video) {
//      return video.items.filter((vid) => {
//        return vid.id.videoId
//      })
//    })
//    .then(function(videos) {
//      return videos.map(vid => {
//        return vid.id.videoId
//      })
//    })
//   .then(function(youTubeArray) {
//     concertObj.youTube = youTubeArray.slice(0, 2)
//     return concertObj
//   })
//   .then(function(obj) {
//     if (Array.isArray(concertTitle) && index < concertTitle.length -1) {
//       getYouTube(concertTitle, obj, index++)
//     }
//     return obj
//   })
//   .catch(() => {
//     console.log('YOUTUBE IS ANGRY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
//   });
// }
//
// module.exports = getYouTube;


//
// var searchTerm = '"Alone and Together” feat. Kevin Morby'
// var reSearchTerm = /"/g;
// var photo = reSearchTerm.exec(searchTerm);
// console.log(photo)






const fetchURL = require('./fetch');
const APIKey = require('./APIKeys');

const getYouTube = (concertTitle, concertObj) => {
  let searchTerm = concertTitle[0].trim().split(' ').join('%22');

  const URL = `https://www.googleapis.com/youtube/v3/search?key=${APIKey.YOUTUBE}&part=snippet&maxResults=9&q=%22${searchTerm}%22music%22live%22&{videoEmbeddable:true}`;
 return fetchURL(URL)
 .then(function(video) {
     return video.items.filter((vid) => {
       return vid.id.videoId
     })
   })
   .then(function(videos) {
     return videos.map(vid => {
       return vid.id.videoId
     })
   })
  .then(function(youTubeArray) {
    concertObj.youTube = youTubeArray.slice(0, 2)
    return concertObj
  })
  .catch(() => {
    console.error('youTube.js error', concertTitle)
  });
}

module.exports = getYouTube;
