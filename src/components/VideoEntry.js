import React, { PropTypes } from 'react';
import YouTube from 'react-youtube';
import { hideControlsMobile, pauseAllButPlaying } from '../utilities/videoEntryHelpers';

const VideoEntry = ({ index, videoId, isRendered }) => {
  const opts = hideControlsMobile();

  // plays first video when EventsListEntry component is clicked
  // autoplay: https://developers.google.com/youtube/player_parameters
  isRendered && index === 0 ? opts.playerVars.autoplay = 1 : opts.playerVars.autoplay = 0;

  return (
    <div className="video">
      {isRendered && <YouTube
        videoId={videoId}
        opts={opts}
        onPlay={pauseAllButPlaying}
      />}
    </div>
  );
};

VideoEntry.propTypes = {
  index: PropTypes.number,
  videoId: PropTypes.string,
  isRendered: PropTypes.bool,
};

export default VideoEntry;
