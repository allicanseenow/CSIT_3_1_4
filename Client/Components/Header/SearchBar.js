import React, { Component }                 from 'react';
import { connect }                          from 'react-redux';
import _                                    from 'lodash';
import { fetch }                            from '../../Actions/MainPage';
import DateBar                              from './SearchBarComponents/DateBar';
import CapacityBar                          from "./SearchBarComponents/CapacityBar";
import CostBar                              from "./SearchBarComponents/CostBar";

import                                      '../CSS/NavBar/SearchBar.scss';
import LocationBar from "./SearchBarComponents/LocationBar";

class SearchBar extends Component {
  state = {
    time: [],
    capacity: null,
    cost: null,
    location: null,
    showDatePanel: false,
    showCapacityPanel: false,
  };

  /**
   * Change the value of the date to filter
   * @param value Value of the new date
   */
  onCalendarChange = (value) => {
    this.setState({ time: value, showDatePanel: false });
  };

  /**
   * Change the value of the capicity to filter
   * @param value Value of the new capacity
   */
  onCapicityChange = (value) => {
    this.setState({ capacity: value, showCapacityPanel: false });
  };

  /**
   * Change the value of the cost to filter
   * @param value Value of the new cost
   */
  onCostChange = (value) => {
    this.setState({ cost: value, showCostPanel: false });
  };

  onLocationChange = (value) => {
    this.setState({ location: value, showLocationPanel: false });
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
      default:
        break;
    }
  };

  componentDidMount() {
    this.props.fetch();
  }

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
      default: {
        break;
      }
    }
  };

  render() {
    const { showDatePanel, showCapacityPanel, showCostPanel, showLocationPanel, time, capacity, cost, location } = this.state;
    console.log("this props inside SearchBar", this.props);
    console.log("this state", this.state);
    return (
      <div className="search-bar">
        <ul>
          <li>
            <div onClick={() => this.onClickPanel(0)}><a className={!_.isEmpty(time) && "a-being-selected"}>Date</a></div>
            { showDatePanel && (
              <DateBar
                onCalendarChange={this.onCalendarChange}
                time={time}
                onBlur={this.onBlur}
              />
            ) }
          </li>
          <li>
            <div onClick={() => this.onClickPanel(1)}><a className={capacity && "a-being-selected"}>Capacity</a></div>
            { showCapacityPanel && (
              <CapacityBar
                onCapicityChange={this.onCapicityChange}
                onBlur={this.onBlur}
                value={capacity}
              />
            ) }
          </li>
          <li>
            <div onClick={() => this.onClickPanel(2)}><a className={!_.isEmpty(cost) && cost[1] && "a-being-selected"}>Cost</a></div>
            { showCostPanel && (
              <CostBar
                onCostChange={this.onCostChange}
                onBlur={this.onBlur}
                value={cost}
              />
            ) }
          </li>
          <li>
            <div onClick={() => this.onClickPanel(3)}><a className={!_.isEmpty(location) && "a-being-selected"}>Location</a></div>
            { showLocationPanel && (
              <LocationBar
                onLocationChange={this.onLocationChange}
                onBlur={this.onBlur}
                value={location}
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
  fetch,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);