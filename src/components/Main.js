import React, { Component } from 'react';
import EventsList from './EventsList';
import AppLogo from './AppLogo';
import { sortByDate } from '../utilities/filterHelpers';
import Filters from './Filters';
import venueDecalLogo from '../../public/bandsNearbyLogo.svg';
import { connect } from 'react-redux';
import { fetchConcertData } from '../actionCreators'


const concertData = require('../../server/data/productionBetaData');

class Main extends Component {
  constructor() {
    super();
    this.state = {
      concertData,
      concerts: {},
    };
  }

  componentWillMount() {
    this.setState({ concerts: sortByDate(this.state.concertData) });
    if (!this.props.concertData[0]) {
     this.props.dispatch(fetchConcertData(`http://demo5873748.mockable.io/`))
    }
  }

  componentDidMount() {
    document.addEventListener('touchstart', () => {}, true);

  }

  handleFilters = (filtered) => {
    this.setState({ concerts: filtered });
  }

  render() {
    return (
      <div>
        <header>
          <div className="header-container">
            <AppLogo />
            <Filters
              concertData={this.state.concertData}
              concerts={this.state.concerts}
              handleFilters={this.handleFilters}
            />
          </div>
        </header>
        <div className="main-view-wrapper">
          <div className="main-view-left" />
          <div className="main-view-center">
            <EventsList
              // concerts={this.state.concerts}
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

const mapStateToProps = (state, ownProps) => {

  const concertData = state.concertData[ownProps.show] ? state.concertData[ownProps.show] : {}
  return {
    concertData
  }
}

export default connect(mapStateToProps)(Main)
