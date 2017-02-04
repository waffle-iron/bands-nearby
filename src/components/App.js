import React, { Component } from 'react';
import '../css/App.css';
import EventsList from './EventsList';
import concerts from '../utilities/mockData';

class App extends Component {
  constructor() {
    super();
    this.state = {
      concerts,
      exploreMusic: -1,
    };
  }

  exploreMusicStart = () => {
    let index = this.state.exploreMusic + 1 | 0;
    this.setState({exploreMusic: index});
  }

  eMusicHandler = () => {
    let index = this.state.exploreMusic + 1 | 0;
    this.setState({exploreMusic: index});
  }

  render() {
    return (
      <div className="wrapper">
        <button onClick={this.exploreMusicStart}>Play Music</button>
        <EventsList concerts={[this.state.concerts[this.state.exploreMusic]]} />
        <EventsList exploreMusic={this.state.exploreMusic} eMusicHandler={this.eMusicHandler} concerts={this.state.concerts} />
      </div>
    );
  }
}
export default App;
