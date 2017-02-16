import React, { Component } from 'react';
import { findMinMax, costMatches, typeaheadMatches } from '../utilities/filterHelpers';

class Filters extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    this.setMinMax(this.props.concertData);
  }
  componentDidMount() {
    this.rangeInput.value = this.state.max;
  }

  setMinMax = (concerts) => {
    const maxMin = findMinMax(concerts);
    this.setState({ min: maxMin[0] });
    this.setState({ max: maxMin[1] });
    return maxMin;
  }

  minCostCorrection = (concertsMinCost, searchedCost) => {
    if (concertsMinCost > searchedCost) {
      this.setState({ searchedCost: concertsMinCost });
    }
  }

  getFilteredConcerts = (...args) => {
    const [concerts, typeAheadString, searchedCost] = [...args];
    const filterByTypeahead = typeaheadMatches(this.props.concertData, this.state.typeAheadString);
    console.log(typeAheadString)
    this.setMinMax(filterByTypeahead);
    return costMatches(filterByTypeahead, this.state.searchedCost)
  }

  boundFilter = (value) => {

    return (...args) => {
      const [concerts, typeAheadString, searchedCost] = [...args];
      const filterByTypeahead = typeaheadMatches(this.props.concertData, this.state.typeAheadString);
      console.log(typeAheadString)
      this.setMinMax(filterByTypeahead);
      return costMatches(filterByTypeahead, value)
    }

  }

  handleUpdate = (val) => {
    const test = this.boundFilter(val)

    this.props.handleFilters(test(this.state.concertData, this.state.typeAheadString,  this.state.searchedCost));
    this.minCostCorrection(this.state.min, this.state.searchedCost);
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.handleUpdate(e.target.value);
  }

  render() {
    const { concertData, handleFilters } = this.props;
    return (
      <div>
        <label>Search</label>
        <input name="typeAheadString" type="text" onChange={(e)=>this.handleInput(e)} onKeyUp={(e)=>this.handleUpdate(e)} placeholder="Band/SoundsLike/Venue"/>
        {this.state.min !== Infinity &&
        <div>
          <div>
            ${this.state.searchedCost}
          </div>
          ${this.state.min}
          <input name="searchedCost" type="range"  onChange={(e)=>this.handleInput(e)} onTouchEnd={(e)=>this.handleInput(e)} onMouseUp={(e)=>this.handleInput(e)} min={this.state.min} max={this.state.max} ref={(input) => { this.rangeInput = input; }}/>
          ${this.state.max}
        </div>}
      </div>
    )
  }
}

export default Filters;
