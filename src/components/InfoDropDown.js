import React, { Component, PropTypes } from 'react';
import VideoList from './VideoList';

class InfoDropDown extends Component {

  static propTypes = {
    artistSummary: PropTypes.string,
    photo: PropTypes.string,
    youTube: PropTypes.arrayOf(PropTypes.string),
    toggled: PropTypes.bool,
    slideAnimation: PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      isToggled: 'hide',
    };
  }

  render() {
    const { artistSummary, photo, youTube, toggled, slideAnimation, id } = this.props;
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
              id={id}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default InfoDropDown;
