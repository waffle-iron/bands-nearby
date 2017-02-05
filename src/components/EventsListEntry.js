import React, { Component } from 'react';

import SimilarArtistsList from './SimilarArtistsList'
import TitleList from './TitleList'
import InfoDropDown from './InfoDropDown';

class EventsListEntry extends Component {
  constructor() {
    super();
    this.state = {
      toggled: false,
    };
  }
  toggle() {
    this.setState({ toggled: !this.state.toggled });
  }
  addClass() {
    return this.state.toggled ? 'show ' : 'hide';
  }
  isCover(cost) {
    return typeof cost === 'number' && cost === cost ? cost = `$${cost}` : cost = 'No Cover';
  }
  render() {
    const { titles, ticketLink, date, venue, cost, photo, startTime, youTube, similarArtists, artistSummary, id, exploreMusic, eMusicHandler } = this.props;
    const isDisplayed = this.addClass();
    const showCost = this.isCover(cost);

    return (
      <li className="event-list-entry" onClick={() => this.toggle()}>
        <div className="show-info">
          <div className="date">{date}</div>
          <span className="headliner">{titles[0]}</span>
          <span className="other-bands"><TitleList titles={this.props.titles} /></span>
          <div>
            <span className="venue">{venue}</span>
            <span className="startTime">{startTime}pm</span>
            <span className="cost">{showCost}</span>
            {showCost !== 'No Cover' && <span className="tickets"><a href={ticketLink}>Tickets</a></span>}
          </div>
          <div className="similar-artists">
            {similarArtists[0] && <SimilarArtistsList artists={similarArtists} />}
          </div>
        </div>
        <div className="concert-photo-wrapper">
          <img className="concert-photo" src={photo} alt={photo} />
        </div>
        <InfoDropDown
          eMusicHandler={eMusicHandler}
          id={id}
          artistSummary={artistSummary} photo={photo}
          youTube={youTube} toggled={this.state.toggled}
          isDisplayed={isDisplayed}
          exploreMusic={exploreMusic}
        />
      </li>
    );
  }
}

export default EventsListEntry;
