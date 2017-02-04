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
    document.querySelectorAll('iframe').forEach((video) => {
      if (video !== event.target.a) {
        video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
      }
    });
  }

  k(eMusicHandler) {
    eMusicHandler()
  }

// plays first video when EventsListEntry component is clicked
// autoplay: https://developers.google.com/youtube/player_parameters
  renderHelper() {
    const opts = { height: 'auto', width: '100%', playerVars: { autoplay: 0 }};
    if (this.props.isRendered) {
      this.props.index === 0 ? opts.playerVars.autoplay = 1 : opts.playerVars.autoplay = 0;
      return (
        <YouTube
          videoId={this.props.videoId}
          opts={opts}
          onPlay={this.pauseAllButPlaying}
          onEnd={()=>this.k(this.props.eMusicHandler)}
          // onPause={()=>this.k(this.props)}
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
