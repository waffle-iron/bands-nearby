import React, { Component } from 'react';
import VideoList from './VideoList';


class InfoDropDown extends Component {
  constructor() {
    super();
    this.state = {
      isToggled: 'hide',
    };
  }

  render() {
    const { id, artistSummary, photo, youTube, toggled, slideAnimation } = this.props;
    let isShown;
    toggled ? isShown = 'show' : isShown = 'hide';
    return (
      <div className="dropdown-container">
        <div className={slideAnimation} >
          <div className={isShown}>
            <div className="artist-summary-container">
              <div className="artist-summary">
                <p>{artistSummary}</p>
              </div>
            </div>
            <VideoList
              photo={photo}
              youTube={youTube}
              isRendered={toggled}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default InfoDropDown;
