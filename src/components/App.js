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

  render() {
    return (
      <div className="wrapper">
        <button onClick={this.exploreMusicStart}>Play Music</button>
        {this.state.exploreMusic && <div className="exploreMusicPlayer">
          <button onClick={this.eMusicIndexIncrement}>Forward</button>
          <button onClick={this.eMusicIndexDecrement}>Back</button>
          <button onClick={this.eMusicPause}>Pause</button>
           <EventsList concerts={[this.state.concerts[this.state.exploreMusicIndex]]}  exploreMusic={this.state.exploreMusic} eMusicHandler={this.eMusicHandler}/>
        </div>}
        {!this.state.exploreMusic && <EventsList concerts={this.state.concerts}/>}
      </div>
    );
  }
}
export default App;
