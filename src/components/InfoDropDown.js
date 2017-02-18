import React, {Component} from 'react';
import VideoList from './VideoList'

class InfoDropDown extends Component {
  constructor() {
    super();
  }

  render() {
    const { exploreMusic, eMusicHandler, id, artistSummary, photo, youTube, toggled, isDisplayed } = this.props;
    let style;
    let isOpen;
    exploreMusic ? style = 'exploreMusicIndex-more-info-dropdown' : style = 'more-info-dropdown';
    exploreMusic ? isOpen = true : null;
    toggled ? isOpen = true : null;

    let slidein;
    if (!toggled | !isOpen) {
      slidein = 'raised'
    } else {
      slidein = 'lowered';
    }

    return (
      <div className="dropdown-container">
      <div className={slidein}>
      <div className={style} className={isDisplayed} >
        <div className="artist-summary-container">
          <div className="artist-summary">
            <p>{artistSummary}</p>
          </div>
        </div>
        <VideoList photo={photo} youTube={youTube} isRendered={isOpen} eMusicHandler={eMusicHandler} />
      </div>
        </div>
        </div>
    );
  }
}
export default InfoDropDown;
