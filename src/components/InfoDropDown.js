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

    return (
      <div className={style} className={isDisplayed} >
        <div className="artist-summary-container">
          <div className="artist-summary">
            <p>{artistSummary}</p>
          </div>
        </div>
        <VideoList photo={photo} youTube={youTube} isRendered={isOpen} eMusicHandler={eMusicHandler} />
      </div>
    );
  }
}
export default InfoDropDown;
