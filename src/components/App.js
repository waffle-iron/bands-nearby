import React, { Component } from 'react';
import '../css/App.css';
import EventsList from './EventsList';
import concerts from '../utilities/mockData.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      concerts,
    }
  }
  render() {
    return (
      <div className="App">
        <EventsList concerts={this.state.concerts} />
      </div>
    );
  }
}
export default App;
