import React, { Component }                   from "react";
import { DatePicker }                         from 'antd';
import ButtonRow                              from "./ButtonRow";

const { RangePicker } = DatePicker;

export default class DateBar extends Component {
  state = {
    tempTime: this.props.time || null,
  };

  onClick = (e) => {
    if (e.target === this.putt) {
      this.props.onCalendarChange(this.state.tempTime);
    }
  };

  onCalendarChange = (value) => {
    this.setState({ tempTime: value });
  };

  onClickCancel = () => {
    this.props.onBlur('date', false);
  };

  onClickSave = () => {
    this.props.onCalendarChange(this.state.tempTime);
  };

  onKeyDown = (e) => {
    // If "esc" button is pressed
    if (e.keyCode === 27) {
      this.props.onBlur('date', false);
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown, false);
  }

  render() {
    const { tempTime } = this.state;
    return (
      <div className="pop-up" onClick={this.onClick} ref={(input) => this.putt = input}>
        <div className="pop-up_inner pop-up_inner-top" style={{ right: "auto"}}>
          <div className="pop-up_inner_content">
            <div>
              <label>Enter a date range</label>
            </div>
            <RangePicker
              format="DD-MM-YYYY"
              showTime
              value={tempTime}
              onChange={this.onCalendarChange}
              disabledDate={this.disabledDate}
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