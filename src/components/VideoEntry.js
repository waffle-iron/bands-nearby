import React, { Component } from 'react';
import YouTube from 'react-youtube';

class VideoEntry extends Component {
  constructor() {
    super();
    this.state = {
      shouldDisplayIframe: false,
    };
  }

  // pauses all videos but current using youTube api
  pauseAllButPlaying(event) {
    console.log('this works')
    document.querySelectorAll('iframe').forEach((video) => {
      if (video !== event.target.a) {
        video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
      }
    });
  }

  k(event) {
    console.log('k ')

  }



// plays first video when EventsListEntry component is clicked
// autoplay: https://developers.google.com/youtube/player_parameters
  renderHelper() {
    const opts = { height: 'auto', width: '100%', playerVars: { autoplay: 0 }};
    if (this.props.isDisplayed) {
      this.props.index === 0 ? opts.playerVars.autoplay = 1 : opts.playerVars.autoplay = 0;
      return (
        <YouTube
          // className={this.props.isDisplayed}
          videoId={this.props.videoId}
          opts={opts}
          onPlay={this.pauseAllButPlaying}
          onEnd={this.k}
          onPause={console.log('paused')}
        />
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderHelper()}
      </div>
    );
  }
}

export default VideoEntry;
