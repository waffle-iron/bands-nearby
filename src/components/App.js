import React, { Component } from 'react';
import '../css/App.css';
import EventsList from './EventsList';
import concerts from '../utilities/mockData';

class App extends Component {
  constructor() {
    super();
    this.state = {
      concerts,
      exploreMusicIndex: 0,
      exploreMusic: false,
    };
  }

  exploreMusicStart = () => {
    this.setState({exploreMusic: !this.state.exploreMusic})
  }

  eMusicHandler = () => {
    this.setState({exploreMusicIndex: this.state.exploreMusicIndex + 1});
  }

  render() {
    return (
      <div className="wrapper">
        <button onClick={this.exploreMusicStart}>Play Music</button>
        <button onClick={this.exploreMusicStart}>Forward</button>
        <button onClick={this.exploreMusicStart}>Back</button>

        {this.state.exploreMusic && <EventsList concerts={[this.state.concerts[this.state.exploreMusicIndex]]}  exploreMusic={this.state.exploreMusic} eMusicHandler={this.eMusicHandler}/>}
        {!this.state.exploreMusic && <EventsList concerts={this.state.concerts}/>}
      </div>
    );
  }
}
export default App;
