import React, { Component }                 from 'react';
import { connect }                          from 'react-redux';
import _                                    from 'lodash';
import moment                               from 'moment';
import { fetchCarListing }                  from '../../Actions/MainPage';
import DateBar                              from './SearchBarComponents/DateBar';
import CapacityBar                          from "./SearchBarComponents/CapacityBar";
import CostBar                              from "./SearchBarComponents/CostBar";
import MoreFilter                           from "./SearchBarComponents/MoreFilter";
import LocationBar                          from "./SearchBarComponents/LocationBar";

import                                      '../CSS/NavBar/SearchBar.scss';

class SearchBar extends Component {
  state = {
    time: [],
    capacity: null,
    cost: null,
    location: null,
    moreFilter: { hasMoreFilter: false },
    showDatePanel: false,
    showCapacityPanel: false,
    showMoreFilter: false,
  };

  updateListingSearch = () => {
    const  { time, capacity, cost, location, moreFilter } = this.state;
    const { hasMoreFilter, ...rest } = moreFilter;
    const query = {
      from: time && time[0] && time[0].format("DD-MM-YYYY"),
      to: time && time[1] && time[1].format("DD-MM-YYYY"),
      capacity: capacity || null,
      location,
      ...rest,
      // price: cost,
    };
    this.props.fetchCarListing(query);
  };

  /**
   * Change the value of the date to filter
   * @param value Value of the new date
   */
  onCalendarChange = (value) => {
    this.setState({ time: value, showDatePanel: false }, this.updateListingSearch);
  };

  /**
   * Change the value of the capicity to filter
   * @param value Value of the new capacity
   */
  onCapicityChange = (value) => {
    this.setState({ capacity: value, showCapacityPanel: false }, this.updateListingSearch);
  };

  /**
   * Change the value of the cost to filter
   * @param value Value of the new cost
   */
  onCostChange = (value) => {
    this.setState({ cost: value, showCostPanel: false }, this.updateListingSearch);
  };

  onLocationChange = (value) => {
    this.setState({ location: value, showLocationPanel: false }, this.updateListingSearch);
  };

  onFilterChange = (value) => {
    this.setState({ moreFilter: value, showMoreFilter: false }, this.updateListingSearch);
  };

  onClickPanel = (component) => {
    switch (component) {
      // Change date value
      case 0: {
        this.setState({ showDatePanel: true });
        break;
      }
      // Change capacity value
      case 1: {
        this.setState({ showCapacityPanel: true });
        break;
      }
      // Change cost value
      case 2: {
        this.setState({ showCostPanel: true });
        break;
      }
      // Change location value
      case 3: {
        this.setState({ showLocationPanel: true });
        break;
      }
      case 4: {
        this.setState({ showMoreFilter: true });
        break;
      }
      default:
        break;
    }
  };

  onBlur = (component, value) => {
    switch (component) {
      case 'date': {
        this.setState({ showDatePanel: value });
        break;
      }
      case 'capacity': {
        this.setState({ showCapacityPanel: value });
        break;
      }
      case 'cost': {
        this.setState({ showCostPanel: value });
        break;
      }
      case 'location': {
        this.setState({ showLocationPanel: value });
        break;
      }
      case 'moreFilter': {
        this.setState({ showMoreFilter: value });
        break;
      }
      default: {
        break;
      }
    }
  };

  componentDidMount() {
    if (this.props.state.mainPage && this.props.state.mainPage.listing && !_.isEmpty(this.props.state.mainPage.listing)) return;
    const  { time, capacity, cost, location, moreFilter } = this.state;
    const { hasMoreFilter, ...rest } = moreFilter;
    const from = moment().add(1, 'months').startOf('month').add(4, 'days');
    const to = from.clone().add(1, 'days');
    const query = {
      from: from.format("DD-MM-YYYY"),
      to: to.format("DD-MM-YYYY"),
      capacity: null,
      location: null,
      ...rest,
      // price: cost,
    };
    this.props.fetchCarListing(query);
  }

  render() {
    const {
      showDatePanel, showCapacityPanel, showCostPanel, showLocationPanel, showMoreFilter,
      time, capacity, cost, location, moreFilter
    } = this.state;
    return (
      <div className="search-bar">
        <ul>
          <li>
            <div onClick={() => this.onClickPanel(0)}><a className={!_.isEmpty(time) && "a-being-selected" || undefined}>Date</a></div>
            { showDatePanel && (
              <DateBar
                onCalendarChange={this.onCalendarChange}
                time={time}
                onBlur={this.onBlur}
              />
            ) }
          </li>
          <li>
            <div onClick={() => this.onClickPanel(1)}><a className={(capacity && "a-being-selected") || undefined }>Capacity</a></div>
            { showCapacityPanel && (
              <CapacityBar
                onCapicityChange={this.onCapicityChange}
                onBlur={this.onBlur}
                value={capacity}
              />
            ) }
          </li>
          {/*<li>*/}
            {/*<div onClick={() => this.onClickPanel(2)}><a className={(!_.isEmpty(cost) && cost[1] && "a-being-selected") || undefined }>Cost</a></div>*/}
            {/*{ showCostPanel && (*/}
              {/*<CostBar*/}
                {/*onCostChange={this.onCostChange}*/}
                {/*onBlur={this.onBlur}*/}
                {/*value={cost}*/}
              {/*/>*/}
            {/*) }*/}
          {/*</li>*/}
          <li>
            <div onClick={() => this.onClickPanel(3)}><a className={(!_.isEmpty(location) && "a-being-selected") || undefined }>Location</a></div>
            { showLocationPanel && (
              <LocationBar
                onLocationChange={this.onLocationChange}
                onBlur={this.onBlur}
                value={location}
              />
            ) }
          </li>
          <li>
            <div onClick={() => this.onClickPanel(4)}><a className={(moreFilter.hasMoreFilter && "a-being-selected") || undefined }>More filter</a></div>
            { showMoreFilter && (
              <MoreFilter
                onFilterChange={this.onFilterChange}
                onBlur={this.onBlur}
                value={moreFilter}
              />
            ) }
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { state: state };
};

const mapDispatchToProps = {
  fetchCarListing,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);