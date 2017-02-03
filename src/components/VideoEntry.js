import React, { Component } from 'react';
import YouTube from 'react-youtube';

class VideoEntry extends Component {
  constructor() {
    super();
    this.state = {
      shouldDisplayIframe: false,
    };
  }

  pauseAllButPlaying(event) {
    document.querySelectorAll('iframe').forEach((video) => {
      if (video !== event.target.a) {
        video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
      }
    });
  }

  renderHelper() {
    if (!this.props.isDisplayed) {
      return (
        <img src={this.props.thumbnail} onClick={() =>this.setState({shouldDisplayIframe: true})} alt='thumbnail'/>
      );
    } else {
      if (!this.props.index) {
        const opts = {
          height: 'auto',
          width: '100%',
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
          }
        };
        return (
          <YouTube
            // className={this.props.isDisplayed}
            videoId={this.props.videoId}
            opts={opts}
            onPlay={this.pauseAllButPlaying}
          />
        )
      } else {
        const opts = {
          height: 'auto',
          width: '100%',
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
          }
        };
        return (
          <YouTube
            // className={this.props.isDisplayed}
            videoId={this.props.videoId}
            opts={opts}
            onPlay={this.pauseAllButPlaying}
          />

        );
      }
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
