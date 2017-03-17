import React, { Component } from 'react';
import SimilarArtistsList from './SimilarArtistsList';
import TitleList from './TitleList';
import InfoDropDown from './InfoDropDown';
import { dayToEnglish, isCover, textClamp } from '../utilities/utils';

class EventsListEntry extends Component {
  constructor() {
    super();
    this.state = {
      toggled: false,
      isClicked: 'raised',
    };
  }

  setIsClicked() {
    if (this.state.isClicked === 'raised') {
      this.setState({ isClicked: 'lowered' });
      return;
    }
    this.setState({ isClicked: 'raised' });
  }

  toggle(e) {
    if (e.target.tagName.toLowerCase() === 'a') {
      return;
    }
    this.setState({ toggled: !this.state.toggled });
  }

  clickHandler(e) {
    this.setIsClicked();
    this.toggle(e);
  }

  render() {
    const { titles, ticketLink, date, venue, cost, photo, startTime, youTube, similarArtists, artistSummary, id } = this.props;
    const showCost = isCover(cost);
    return (
      <li className="event-list-entry">
        <div className="show-info-container">
          <div className="show-info" onClick={e => this.clickHandler(e)} >
            <div className="hover-hilight">
              {showCost !== 'No Cover' && <div className="tickets"><a href={ticketLink}>Tickets<span className="cost">{showCost}</span></a></div>}
              {showCost === 'No Cover' && <div className="tickets"><span className="cost">{showCost}</span></div>}
              <div className="date">{dayToEnglish(date)}</div>
              <div className="headliner">{textClamp(titles[0])}</div>
              <span className="other-bands">
                <TitleList titles={this.props.titles} />
              </span>
              <div>
                <span className="venue">{venue}</span>
                <span className="startTime">{startTime}pm</span>
              </div>
            </div>
            <div className="similar-artists">
              {similarArtists[0] && <SimilarArtistsList artists={similarArtists} />}
            </div>
          </div>
        </div>
        <div className="concert-photo-wrapper" >
          <img className="concert-photo" src={photo} alt={photo} />
        </div>
        <InfoDropDown
          id={id}
          key={id}
          artistSummary={artistSummary} photo={photo}
          youTube={youTube} toggled={this.state.toggled}
          slideAnimation={this.state.isClicked}
        />
      </li>
    );
  }
}

export default EventsListEntry;
