import React, { Component } from 'react';
import '../css/App.css';
import EventsList from './EventsList';
import concertData from '../utilities/mockData';
import {sortByDate} from '../utilities/filterHelpers';
import Filters from './Filters';

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

  render() {
    return (
      <div className="wrapper">
        <button onClick={this.exploreMusicStart}>Play Music</button>
        {this.state.exploreMusic && <div className="exploreMusicPlayer">
          <button onClick={this.eMusicIndexIncrement}>Forward</button>
          <button onClick={this.eMusicIndexDecrement}>Back</button>
           <EventsList concerts={[this.state.concerts[this.state.exploreMusicIndex]]}  exploreMusic={this.state.exploreMusic} eMusicHandler={this.eMusicHandler}/>
        </div>}
        {!this.state.exploreMusic && <div>
          <Filters concertData={this.state.concertData} concerts={this.state.concerts} handleFilters={this.handleFilters}/>
          <EventsList concerts={this.state.concerts}/>
        </div>
        }
      </div>
    );
  }
}
export default App;
