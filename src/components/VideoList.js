import React, { PropTypes } from 'react';
import VideoEntry from './VideoEntry';

const VideoList = ({ youTube, photo, isRendered }) => {
  return (
    <ul>
      {youTube.map((video, index) => {
        return (
          <VideoEntry
            videoId={video}
            index={index}
            thumbnail={photo}
            isRendered={isRendered}
            key={index}
          />
        );
      })}
    </ul>
  );
};

VideoList.propTypes = {
  youTube: PropTypes.arrayOf(PropTypes.string),
  photo: PropTypes.string,
  isRendered: PropTypes.bool,
};

export default VideoList;
