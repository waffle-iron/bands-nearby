import React, { Component } from 'react';
import '../css/App.css';
import EventsList from './EventsList';
import concerts from '../utilities/mockData';
import playFirstSong from '../utilities/utils.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      concerts,
      exploreMusic: -1,
    };
  }

  exploreMusicHandler = () => {
    let index = this.state.exploreMusic + 1 | 0;
    this.setState({exploreMusic: index});
  }

  render() {
    return (
      <div className="wrapper">
        <button onClick={this.exploreMusicHandler}>Play Music</button>
        <EventsList exploreMusic={this.state.exploreMusic} concerts={this.state.concerts} />
      </div>
    );
  }
}
export default App;
