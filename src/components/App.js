import React, { Component } from 'react';
import '../css/App.css';
import EventsList from './EventsList';
import { sortByDate } from '../utilities/filterHelpers';
import { isSmallScreen } from '../utilities/utils';
import Filters from './Filters';
import logo from './venueTextOneWord.svg';
import exploreMusicLogo from './playMusic.svg'
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

  componentWillMount(){
    this.setState({concerts: sortByDate(this.state.concertData)})
  }

  componentDidMount(){
    document.addEventListener("touchstart", function(){}, true);
    // document.addEventListener("scroll", this.isScrolling, true);
  }

  exploreMusicStart = () => {
    this.setState({exploreMusic: !this.state.exploreMusic})
  }

  eMusicIndexIncrement = () => {
    if (this.state.exploreMusicIndex < this.state.concerts.length -1) {
      this.setState({exploreMusicIndex: this.state.exploreMusicIndex + 1});
    }
  }

  eMusicIndexDecrement = () => {
    if (this.state.exploreMusicIndex > 0) {
      this.setState({exploreMusicIndex: this.state.exploreMusicIndex - 1});
    }
  }

  eMusicHandler = () => {
    this.eMusicIndexIncrement();
  }

  handleFilters = (filtered) => {
    this.setState({concerts: filtered})
  }

  // isScrolling = () => {
  //   return true;
  // }

  render() {
    return (
      <div>
      <header>
        <div className="app-logo-container">
          <img src={logo}  className="app-logo" alt="logo" />
        </div>
      {!this.state.exploreMusic &&
        <span>
          <Filters concertData={this.state.concertData} concerts={this.state.concerts} handleFilters={this.handleFilters}/>
        </span>
    }
    </header>
    <div className="decal-logo-container">
      <img src={venueDecalLogo} className="decal-logo" alt="logo"/>
    </div>

        <div className="wrapper">


          {this.state.exploreMusic &&
            <div className="exploreMusicPlayer">
              <button onClick={this.eMusicIndexIncrement}>Forward</button>
              <button onClick={this.eMusicIndexDecrement}>Back</button>
               <EventsList concerts={[this.state.concerts[this.state.exploreMusicIndex]]}  exploreMusic={this.state.exploreMusic} eMusicHandler={this.eMusicHandler}/>
            </div>}
            {!this.state.exploreMusic && <EventsList concerts={this.state.concerts}/>}
        </div>
      </div>
    );
  }
}
export default App;
