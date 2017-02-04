import React, {Component} from 'react';
import VideoList from './VideoList'

class InfoDropDown extends Component {
  constructor() {
    super();
  }

  render() {
    const { exploreMusic, id, artistSummary, photo, youTube, toggled, isDisplayed } = this.props;

    if (id === exploreMusic) {
      return (
        <div className='more-info-dropdown' className={true}>
          <div className="artist-summary-container">
            <div className="artist-summary">
              <p>{artistSummary}</p>
            </div>
          </div>
          <VideoList photo={photo} youTube={youTube} isDisplayed={true}/>
        </div>
      )
    }

    return (
      <div className='more-info-dropdown' className={isDisplayed}>
        <div className="artist-summary-container">
          <div className="artist-summary">
            <p>{artistSummary}</p>
          </div>
        </div>
        <VideoList photo={photo} youTube={youTube} isDisplayed={toggled}/>
      </div>
    );
  }
}
export default InfoDropDown;
