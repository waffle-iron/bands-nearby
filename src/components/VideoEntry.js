import React, { Component } from 'react';
import YouTube from 'react-youtube';

class VideoEntry extends Component {
  constructor() {
    super();
    this.state = {
      shouldDisplayIframe: false,
    };
  }

  // pauses all videos but current video using youTube api
  pauseAllButPlaying = (event) => {
    document.querySelectorAll('iframe').forEach((video) => {
      if (video !== event.target.a) {
        video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
      }
    });
  }

  eMusicHandler = (eMusicHandler) => {
    eMusicHandler();
  }

  handleSmallScreen = () => {
    if (!window.matchMedia("(min-width: 667px)").matches) {
      return { height: 'auto', width: '100%', playerVars: { autoplay: 0, controls: 0, playsinline: 1 } };
    }
    return { height: 'auto', width: '100%', playerVars: { autoplay: 0} };
  }

// plays first video when EventsListEntry component is clicked
// autoplay: https://developers.google.com/youtube/player_parameters
  renderHelper() {
    const opts = this.handleSmallScreen();
    if (this.props.isRendered) {
      this.props.index === 0 ? opts.playerVars.autoplay = 1 : opts.playerVars.autoplay = 0;
      return (
        <YouTube
          ref={(input) => { this.rangeInput = input; }}
          videoId={this.props.videoId}
          opts={opts}
          onPlay={this.pauseAllButPlaying}
          onEnd={() => this.eMusicHandler(this.props.eMusicHandler)}
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
