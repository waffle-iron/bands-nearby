import React, { Component } from 'react';
import '../css/App.css';
import EventsList from './EventsList';
import { sortByDate } from '../utilities/filterHelpers';
import { isSmallScreen } from '../utilities/utils';
import Filters from './Filters';
// import logo from './bandsNearbyLogo.svg';
import venueDecalLogo from './venueLogo.svg';

const concertData = require('../../server/data/productionBetaData');

class App extends Component {
  constructor() {
    super();
    this.state = {
      concertData,
      concerts: {},
      exploreMusicIndex: 0,
      exploreMusic: false,
    };
  }

  componentWillMount() {
    this.setState({ concerts: sortByDate(this.state.concertData) });
  }

  componentDidMount() {
    document.addEventListener("touchstart", function () {}, true);
  }
  //
  // exploreMusicStart = () => {
  //   this.setState({ exploreMusic: !this.state.exploreMusic });
  // }
  //
  // eMusicIndexIncrement = () => {
  //   if (this.state.exploreMusicIndex < this.state.concerts.length - 1) {
  //     this.setState({ exploreMusicIndex: this.state.exploreMusicIndex + 1 });
  //   }
  // }
  //
  // eMusicIndexDecrement = () => {
  //   if (this.state.exploreMusicIndex > 0) {
  //     this.setState({ exploreMusicIndex: this.state.exploreMusicIndex - 1 });
  //   }
  // }
  //
  // eMusicHandler = () => {
  //   this.eMusicIndexIncrement();
  // }

  handleFilters = (filtered) => {
    this.setState({ concerts: filtered });
  }

  render() {
    return (
      <div>
        <header>
          <div className="header-container">
          <div className="app-logo-container">
            {!isSmallScreen() && <div className="app-logo">BANDS NEARBY</div>}
            {isSmallScreen() && <div className="app-logo">BN</div>}
            <div className="app-logo-spacer"></div>
          </div>
            <Filters
              concertData={this.state.concertData}
              concerts={this.state.concerts}
              handleFilters={this.handleFilters}
            />
        </div>
        </header>
        <div className="main-view-wrapper">
          <div className="main-view-left"></div>
          <div className="main-view-center">
            <EventsList
              concerts={this.state.concerts}
            />
            <div className="decal-logo-container-mobile">
              <img src={venueDecalLogo} className="decal-logo-mobile" alt="logo" />
            </div>
          </div>
          <div className="main-view-right">
        <div className="decal-logo-container">
          <img src={venueDecalLogo} className="decal-logo" alt="logo" />
        </div>
      </div>
      </div>
      </div>
    );
  }
}
export default App;
