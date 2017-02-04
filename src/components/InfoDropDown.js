import React, {Component} from 'react';
import VideoList from './VideoList'

class InfoDropDown extends Component {
  constructor() {
    super();
  }

  render() {
    const { exploreMusic, eMusicHandler, id, artistSummary, photo, youTube, toggled, isDisplayed } = this.props;
    let style;
    exploreMusic ? style = 'exploreMusic-more-info-dropdown' : style = 'more-info-dropdown';
    
    if (id === exploreMusic) {
      return (
        <div className={style} >
          <div className="artist-summary-container">
            <div className="artist-summary">
              <p>{artistSummary}</p>
            </div>
          </div>
          <VideoList photo={photo} youTube={youTube} isDisplayed={true} eMusicHandler={eMusicHandler}/>
        </div>
      )
    }

    return (
      <div className={style} className={isDisplayed} >
        <div className="artist-summary-container">
          <div className="artist-summary">
            <p>{artistSummary}</p>
          </div>
        </div>
        <VideoList photo={photo} youTube={youTube} isDisplayed={toggled} eMusicHandler={eMusicHandler}/>
      </div>
    );
  }
}
export default InfoDropDown;
