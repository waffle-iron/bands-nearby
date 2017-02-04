import React, { Component } from 'react';
import VideoEntry from './VideoEntry';

class VideoList extends Component {
  render() {
    const { youTube, photo, isRendered, eMusicHandler } = this.props;
    return (
      <ul>
        {youTube.map((video, index) => {
          return (
            <VideoEntry
              videoId={video}
              eMusicHandler={eMusicHandler}
              index={index}
              thumbnail={photo}
              isRendered={isRendered}
              key={index}
            />
          );
        })}
      </ul>
    );
  }
}

export default VideoList;
