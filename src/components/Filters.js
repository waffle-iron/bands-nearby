import React, { Component } from 'react';
import { findMinMax, filterByCost, filterByTypeahead } from '../utilities/filterHelpers';

class Filters extends Component {
  constructor() {
    super();
    this.state = {
      costIsSet: false,
      searchedCost: 65,
      min: false,
      max: false,
    };
  }
  componentWillMount() {
    // this.setMinMax(this.props.concertData);
  }

  componentDidMount() {
    this.rangeInput.value = this.state.max;
    // this.setState({searchedCost: this.state.max});
  }

  // handles value update when min/max range changes from text filter
  componentDidUpdate() {
    if (!this.state.costIsSet) {
      this.rangeInput.value = this.state.max;
    }
  }

  setMinMax = (concerts) => {
    const maxMin = findMinMax(concerts);
    this.setState({ min: maxMin[0] });
    this.setState({ max: maxMin[1] });
    return maxMin;
  }

  // handles cost display update when min/max range changes from text filter and range
  displayCost = (searchedCost, max) => {
    if (max !== -Infinity && searchedCost > max | !this.state.costIsSet) {
      return max;
    }
    return searchedCost;
  }

  boundFilter = (name, boundValue) => {
    return (search) => {
      search[name] = boundValue;
      const typeaheadMatches = filterByTypeahead(search.concerts, search.typeAheadString);
      const maxMin = this.setMinMax(typeaheadMatches);
      const val = this.displayCost(search.searchedCost, maxMin[1]);
      this.setState({searchedCost: val})
      return filterByCost(typeaheadMatches, search.searchedCost)
    }
  }

  handleUpdate = (name, val) => {
    const boundFilter = this.boundFilter(name, val)
    this.props.handleFilters(boundFilter({concerts: this.props.concertData, typeAheadString: this.state.typeAheadString,  searchedCost: this.state.searchedCost}));
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.handleUpdate(e.target.name, e.target.value);
    if (e.target.name === 'searchedCost') {
      this.setState({costIsSet: true, rangeValue: e.target.value})
    }
  }

  render() {
    const { concertData, handleFilters } = this.props;
    return (
      <div>
        <label>Search</label>
        <input name="typeAheadString" type="text" onChange={(e)=>this.handleInput(e)} placeholder="Band/SoundsLike/Venue"/>
        {this.state.min !== Infinity && this.props.concerts[0] &&
        <div>
          <div>
            ${this.state.searchedCost}
          </div>
          ${this.state.min}
          <input key="editor1" name="searchedCost" type="range"  onChange={(e)=>this.handleInput(e)} onTouchEnd={(e)=>this.handleInput(e)} onMouseUp={(e)=>this.handleInput(e)} min={this.state.min} max={this.state.max} ref={(input) => { this.rangeInput = input; }}/>
          ${this.state.max}
        </div>}
      </div>
    )
  }
}

export default Filters;
