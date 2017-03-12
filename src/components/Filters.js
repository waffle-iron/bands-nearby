import debounce from 'lodash/debounce';
import React, { Component } from 'react';
import { findMinMax, filterByCost, filterByTypeahead } from '../utilities/filterHelpers';
import { isSmallScreen, isFree } from '../utilities/utils'
import logo from './venueTextOneWord.svg';

class Filters extends Component {
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
  }

  debouncedHander = (e) => {
    // this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'searchedCost' && !this.state.isCostSpecified) {
      this.setState({ isCostSpecified: true });
    }
    e.persist()
    this.debouncedHandleInput(e);
  }

  isCostActive = () => {
    if (this.state.min !== Infinity && this.props.concerts[0] && this.state.max !== this.state.min) {
      return 'searched-cost-active';
    } else if (this.state.min === Infinity) {
      return 'searched-cost-hide';
    }
    return 'searched-cost-inactive';
  }

  costRenderHelper = () => {
    if (isSmallScreen()) {
      return (
        <input name="searchedCost" type="range" className="cost-input" onTouchEnd={e => this.debouncedHander(e)} onMouseUp={e => this.debouncedHander(e)} min={this.state.min} max={this.state.max} ref={(input) => { this.rangeInput = input; }} />
      );
    }
    return (
      <input name="searchedCost" type="range" className="cost-input" onChange={e => this.debouncedHander(e)} onTouchEnd={e => this.debouncedHander(e)} onMouseUp={e => this.debouncedHander(e)} min={this.state.min} max={this.state.max} ref={(input) => { this.rangeInput = input; }} />
    )
  }

  render() {
    const { concertData, handleFilters, concerts } = this.props;
    const costInput = this.costRenderHelper();

    var displayMin = this.state.min
    if (this.state.min === 0) {
      displayMin = 'Free'
    } else {
      displayMin = `$${this.state.min}`
    }

    const displaySearchedCost = isFree(this.state.searchedCost)



    return (
      <div className="filters-container">
        <div className="app-logo-container-mobile">
          <img src={logo} className="app-logo-mobile" alt="logo" />
          <div className="app-logo-spacer-mobile"></div>
        </div>
        <div className="typeahead-container">
          <input name="typeAheadString" id="typeAheadString" type="text" className="typed-input" onChange={e => this.handleInput(e)} placeholder="   Band/SoundsLike/Venue" />
        </div>
        <div className="filter-icon-container-mobile">
          <div className="filter-icon-mobile"></div>
        </div>
        <div className="cost-input-container">
          {/* {concerts.length >= 1 &&
        <span className={this.isCostActive()}> */}
            <div className="price-label-container">
              <span className="searched-cost">
                {displaySearchedCost}
              </span>
            </div>
            <span className="cost-input-bar-container">
            <span className="cost-min">
              {displayMin}
            </span>
            <span className="cost-input-span">
            {costInput}
            </span>
              <span className="cost-max">
                ${this.state.max}
              </span>
            </span>
          {/* </span>} */}
        </div>
    </div>
    //   {/* <div className="filters-container">
    //     <div className="typeahead-container">
    //     {/* <img className="search-icon" src="searchIcon.png" alt="searchIcon"/> */}
    //       <input name="typeAheadString" id="typeAheadString" type="text" className="typed-input" onChange={e => this.handleInput(e)} placeholder="   Band/SoundsLike/Venue" />
    //     </div>
    //     {<div className={this.isCostActive()}>
    //       <div className="cost-input-container">
    //         <span className="searched-cost">
    //           ${this.state.searchedCost}
    //         </span>
    //         <span className="cost-min">
    //           ${this.state.min}
    //         </span>
    //         <span className="cost-input-span">
    //         {costInput}
    //         </span>
    //           <span className="cost-max">
    //             ${this.state.max}
    //           </span>
    //       </div>
    //   </div>}
    // </div> */}
    );
  }
}

export default Filters;
