import React, { Component }                           from "react";
import { InputNumber, Button }                        from 'antd';
import ButtonRow                                      from "./ButtonRow";

export default class CapacityBar extends Component {
  state = {
    tempCapacity: this.props.value || 0,
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown, false);
  }

  onClick = (e) => {
    if (e.target === this.putt) {
      this.props.onCapicityChange(this.state.tempCapacity);
    }
  };

  onClickCancel = () => {
    this.props.onBlur('capacity', false);
  };

  onClickSave = () => {
    this.props.onCapicityChange(this.state.tempCapacity);
  };

  onKeyDown = (e) => {
    // If "esc" button is pressed
    if (e.keyCode === 27) {
      this.props.onBlur('capacity', false);
    }
  };

  onChange = (value) => {
    this.setState({ tempCapacity: value });
  };

  render() {
    const { tempCapacity } = this.state;
    return (
      <div className="pop-up" onClick={this.onClick} ref={(input) => this.putt = input}>
        <div className="pop-up_inner pop-up_inner-top">
          <div className="pop-up_inner_content">
            <div>
              The maximum number of people to be allowed in a car is 20
            </div>
            <InputNumber
              min={0}
              max={20}
              defaultValue={tempCapacity}
              onChange={this.onChange}
            />
            <ButtonRow
              onClickCancel={this.onClickCancel}
              onClickSave={this.onClickSave}
            />
          </div>
        </div>
      </div>
    )
  }
}