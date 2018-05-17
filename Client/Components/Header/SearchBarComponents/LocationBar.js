import React, { Component }                   from "react";
import { Input }                              from 'antd';
import ButtonRow                              from './ButtonRow';

export default class LocationBar extends Component {
  state = {
    tempLocation: this.props.value || null,
  };

  onLocationChange = (event) => {
    this.setState({ tempLocation: event.target.value });
  };

  onClick = (e) => {
    if (e.target === this.putt) {
      this.props.onLocationChange(this.state.tempLocation);
    }
  };

  onClickCancel = () => {
    this.props.onBlur('location', false);
  };

  onClickSave = () => {
    this.props.onLocationChange(this.state.tempLocation);
  };

  onKeyDown = (e) => {
    // If "esc" button is pressed
    if (e.keyCode === 27) {
      this.props.onBlur('location', false);
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown, false);
  }

  render() {
    const { tempLocation } = this.state;
    return (
      <div className="pop-up" onClick={this.onClick} ref={(input) => this.putt = input}>
        <div className="pop-up_inner pop-up_inner-top" style={{ right: "auto"}}>
          <div className="pop-up_inner_content">
            <div>
              <label>Enter a location to pick up the car</label>
            </div>
            <Input
              value={tempLocation}
              onChange={this.onLocationChange}
            />
            <ButtonRow
              onClickSave={this.onClickSave}
              onClickCancel={this.onClickCancel}
            />
          </div>
        </div>
      </div>
    )
  }
}