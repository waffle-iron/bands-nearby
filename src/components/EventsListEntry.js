import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import SimilarArtistsList from './SimilarArtistsList'
import TitleList from './TitleList'
import InfoDropDown from './InfoDropDown';

class EventsListEntry extends Component {
  constructor() {
    super();
    this.state = {
      toggled: false,
      ele: null,
    };
  }

  componentDidMount() {
    window.document.addEventListener('scroll', () => this.isVisible(this.state.ele), true);
    this.setState({ele: ReactDOM.findDOMNode(this)});
  }
  toggle(e) {
    if (e.target.tagName.toLowerCase() === "a") {
      return;
    }
    this.setState({ toggled: !this.state.toggled });
  }
  addClass() {
    return this.state.toggled ? 'show ' : 'hide';
  }
  isCover(cost) {
    return typeof cost === 'number' && cost === cost ? cost = `$${cost}` : cost = 'No Cover';
  }

  isVisible = (el) => {
     if (el){
       const elemTop = el.getBoundingClientRect().top;
       const elemBottom = el.getBoundingClientRect().bottom;
       const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
      //  console.log(isVisible, this.props.titles[0])
       return isVisible;
     }
  }

  handleSmallScreen = (headliner) => {
    if (!window.matchMedia("(min-width: 667px)").matches) {
      return headliner.split(' ').slice(0, 3).join(' ');
    }
    return headliner;
  }


  render() {
    const { titles, ticketLink, date, venue, cost, photo, startTime, youTube, similarArtists, artistSummary, id, exploreMusic, eMusicHandler } = this.props;
    const headliner = this.handleSmallScreen(titles[0]);
    const isDisplayed = this.addClass();
    const showCost = this.isCover(cost);
    return (
      <li className="event-list-entry">
        <div className="show-info"  onClick={e => this.toggle(e)}>
          <div className="hover-hilight">
            {showCost !== 'No Cover' && <div className="tickets"><a href={ticketLink}>Tickets<span className="cost">{showCost}</span></a></div>}
            {/* <div className="date">{date}</div> */}
            <div className="headliner">{headliner}</div>
            <span className="other-bands"><TitleList titles={this.props.titles} /></span>
            <div>
              <span className="venue">{venue}</span>
              <span className="startTime">{startTime}pm</span>
            </div>
          </div>
          <div className="similar-artists">
            {similarArtists[0] && <SimilarArtistsList artists={similarArtists} />}
          </div>
        </div>
        <div className="concert-photo-wrapper" >
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
