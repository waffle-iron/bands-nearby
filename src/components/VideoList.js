import React, { Component } from 'react';
import VideoEntry from './VideoEntry';

class VideoList extends Component {
  render() {
    const { youTube, photo, isDisplayed, eMusicHandler } = this.props;
    return (
      <ul>
        {youTube.map((video, index) => {
          return (
            <VideoEntry
              videoId={video}
              eMusicHandler={eMusicHandler}
              index={index}
              thumbnail={photo}
              isDisplayed={isDisplayed}
              key={index}
            />
          );
        })}
      </ul>
    );
  }
}

export default VideoList;
