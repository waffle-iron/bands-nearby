import React, {Component} from 'react';
import {findMinMax, costMatches, typeaheadMatches, filteredMatches, displayMatches} from '../utilities/filterHelpers';
import debounce from 'lodash/debounce';

class Filters extends Component {
  constructor() {
    super();
    this.state = {
      min: 0,
      max: 0,
      typeAheadString: '',
    };
  }
  componentDidMount() {
    const maxMin = this.handleMinMax()
    this.setState({searchedCost: maxMin[1]});
  }

  handleMinMax = () => {
    const maxMin = findMinMax(this.props.concertData);
    this.setState({min: maxMin[0]});
    this.setState({max: maxMin[1]});
    return maxMin;
  }

  handleUpdate = (e) => {
    console.log('handler caled')
    displayMatches(this.props.concertData, this.state.typeAheadString, this.state.searchedCost, this.props.handleFilters);
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
    this.handleUpdate();

  }

  render() {
    const { concertData, handleFilters } = this.props;
    return (
      <div>
        <label>Search</label>
        <input name="typeAheadString" type="text" onChange={(e)=>this.handleInput(e)} onKeyUp={(e)=>this.handleUpdate(e)} placeholder="Band/SoundsLike/Venue"/>
        $<input name="searchedCost" type="range"  onChange={(e)=>this.handleInput(e)} onTouchEnd={(e)=>this.handleInput(e)} onMouseUp={(e)=>this.handleInput(e)} min={this.state.min} max={this.state.max} value={this.state.searchedCost}/>$$$
      </div>
    )
  }
}

export default Filters;
