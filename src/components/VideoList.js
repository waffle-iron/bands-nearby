import React, { Component } from 'react';
import VideoEntry from './VideoEntry';

class VideoList extends Component {
  render() {
    const { youTube, photo, isDisplayed } = this.props;
    return (
      <div ref={() => 'list'} className="events-list">
        <ul>
          {youTube.map((video, index) => {
            return (
              <VideoEntry
                videoId={video}
                index={index}
                thumbnail={photo}
                isDisplayed={isDisplayed}
                key={index}
              />
            );
          })};
        </ul>
      </div>
    );
  }
}

export default VideoList;
