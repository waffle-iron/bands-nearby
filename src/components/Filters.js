import React, { Component } from 'react';
import { findMinMax, filterByCost, filterByTypeahead } from '../utilities/filterHelpers';

class Filters extends Component {
  constructor() {
    super();
    this.state = {
      isCostSpecified: null,
      searchedCost: null,
      min: null,
      max: null,
    };
  }
  componentWillMount() {
    this.setMinMax(this.props.concertData);
  }

  componentDidMount() {
    this.setState({ searchedCost: this.state.max });
  }

  // handles value update when min/max range changes from text filter
  componentDidUpdate() {
    if (!this.state.isCostSpecified && this.rangeInput) {
      this.rangeInput.value = this.state.max;
    }
  }

  setMinMax = (concerts) => {
    const maxMin = findMinMax(concerts);
    this.setState({ min: maxMin[0] });
    this.setState({ max: maxMin[1] });
    return maxMin;
  }

  // returns searchedCost or max if no search cost is entered
  searchedCostOrMax = (searchedCost, max) => {
    if (max !== -Infinity && searchedCost > max | !this.state.isCostSpecified) {
      return max;
    }
    return searchedCost;
  }

  // returns function bound with latest input; handles React asynch state keeping query in synch
  // TODO: add aditional filters here:
  boundFilter = (name, boundValue) => {
    return (search) => {
      search[name] = boundValue;
      const typeaheadMatches = filterByTypeahead(search.concerts, search.typeAheadString);
      const maxMin = this.setMinMax(typeaheadMatches);
      const costToDisplay = this.searchedCostOrMax(search.searchedCost, maxMin[1]);
      this.setState({ searchedCost: costToDisplay });
      return filterByCost(typeaheadMatches, search.searchedCost);
    };
  }

  handleUpdate = (inputName, inputValue) => {
    const boundFilter = this.boundFilter(inputName, inputValue);
    this.props.handleFilters(boundFilter({ concerts: this.props.concertData, typeAheadString: this.state.typeAheadString, searchedCost: this.state.searchedCost }));
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.handleUpdate(e.target.name, e.target.value);
    if (e.target.name === 'searchedCost') {
      this.setState({ isCostSpecified: true });
    }
  }

  render() {
    const { concertData, handleFilters } = this.props;
    return (
      <div>
        <label htmlFor="typeAheadString">Search</label>
        <input name="typeAheadString" id="typeAheadString" type="text" onChange={e => this.handleInput(e)} placeholder="Band/SoundsLike/Venue" />
        {
          this.state.min !== Infinity && this.props.concerts[0] && this.state.max !== this.state.min &&
          <div>
            <div>
              ${this.state.searchedCost}
            </div>
            ${this.state.min}
            <input name="searchedCost" type="range" onChange={e => this.handleInput(e)} onTouchEnd={e => this.handleInput(e)} onMouseUp={e => this.handleInput(e)} min={this.state.min} max={this.state.max} ref={(input) => { this.rangeInput = input; }} />
            ${this.state.max}
          </div>}
        {this.state.max === this.state.min && this.props.concerts[0] &&
        <div>
          ${this.state.searchedCost}
        </div>
        }
      </div>
    );
  }
}

export default Filters;
