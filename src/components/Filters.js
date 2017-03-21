import debounce from 'lodash/debounce';
import React, { Component, PropTypes } from 'react';
import { findMinMax, filterByCost, filterByTypeahead, displayMin } from '../utilities/filterHelpers';
import { isSmallScreen, isFree } from '../utilities/utils';

class Filters extends Component {

  static propTypes = {
    concertData: PropTypes.arrayOf(PropTypes.object),
    handleFilters: PropTypes.func,
    concerts: PropTypes.arrayOf(PropTypes.object),
  }

  constructor() {
    super();
    this.state = {
      isCostSpecified: null,
      searchedCost: null,
      min: null,
      max: null,
    };
    this.debouncedHandleInput = debounce(this.handleInput, 15);
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
    return max !== -Infinity && searchedCost > max | !this.state.isCostSpecified ? max : searchedCost;
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
  }

  debouncedHander = (e) => {
    if (e.target.name === 'searchedCost' && !this.state.isCostSpecified) {
      this.setState({ isCostSpecified: true });
    }
    e.persist();
    this.debouncedHandleInput(e);
  }

  isCostActive = (classname) => {
    if (this.state.min !== Infinity && this.props.concerts[0] && this.state.max !== this.state.min) {
      return `${classname}`;
    } else if (this.state.min === Infinity) {
      return `${classname} total-opaque`;
    }
    return `${classname} partial-opaque`;
  }

  costRenderHelper = () => {
    if (isSmallScreen()) {
      return (
        <input
          name="searchedCost"
          type="range"
          className="cost-input"
          onTouchEnd={e => this.debouncedHander(e)}
          onTouchStart={e => this.debouncedHander(e)}
          onMouseUp={e => this.debouncedHander(e)}
          min={this.state.min}
          max={this.state.max}
          ref={(input) => { this.rangeInput = input; }}
        />
      );
    }
    return (
      <input
        name="searchedCost"
        type="range"
        className="cost-input"
        onChange={e => this.debouncedHander(e)}
        onMouseUp={e => this.debouncedHander(e)}
        min={this.state.min}
        max={this.state.max}
        ref={(input) => { this.rangeInput = input; }}
      />
    );
  }

  render() {
    const { concertData, handleFilters, concerts } = this.props;
    return (
      <div className="filters-container">
        <div className="typeahead-container">
          <input name="typeAheadString" id="typeAheadString" type="text" className="typed-input" onChange={e => this.handleInput(e)} placeholder="Band/SoundsLike/Venue" />
        </div>
        <div className="searched-cost-container-mobile">
          <div className="searched-cost-frame-mobile">
            <div className={this.isCostActive("searched-cost-mobile")}>{this.state.searchedCost}</div>
          </div>
        </div>
        <div className={this.isCostActive("cost-input-container")}>
          <div className="price-label-container">
            <span className="searched-cost">
              {isFree(this.state.searchedCost)}
            </span>
          </div>
          <span className="cost-input-bar-container">
            <span className="cost-min-container">
              {this.state.min !== Infinity &&
                <span className="cost-min">{displayMin(this.state.min)}</span>}
            </span>
            <span className="cost-input-span">
              {this.costRenderHelper()}
            </span>
            <span className="cost-max-container">
              {this.state.max !== -Infinity && <span className="cost-max">${this.state.max}</span>}
            </span>
          </span>
        </div>
      </div>
    );
  }
}

export default Filters;
