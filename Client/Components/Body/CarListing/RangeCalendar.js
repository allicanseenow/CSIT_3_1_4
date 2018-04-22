import 'rc-calendar/assets/index.css';
import React from 'react';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import enUS from 'rc-calendar/lib/locale/en_US';
import 'rc-time-picker/assets/index.css';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import moment from 'moment';
import 'moment/locale/en-gb';
import PropTypes from "prop-types";

const FORMAT = 'DD-MM-YYYY HH:mm:ss';

const now = moment();
now.locale('en-gb').utcOffset(0);

function getFormat(time) {
  return time ? FORMAT : 'DD-MM-YYYY';
}


const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = <TimePickerPanel />;

class Picker extends React.Component {
  state = {
    showTime: this.props.showTime,
    disabled: false,
  };

  render() {
    const { showTime, disabledDate, disabled, value, onChange, showDateInput } = this.props;
    const calendar = (<Calendar
      locale={enUS}
      defaultValue={now}
      timePicker={showTime ? timePickerElement : null}
      disabledDate={disabledDate}
      showDateInput={showDateInput}
    />);
    return (<DatePicker
      animation="slide-up"
      disabled={disabled}
      calendar={calendar}
      value={value}
      onChange={onChange}
    >
      {
        ({ value }) => {
          return (
            <span>
                <input
                  placeholder={FORMAT}
                  style={{ width: 250 }}
                  disabled={disabled}
                  readOnly
                  value={(value && value.format(getFormat(showTime))) || ''}
                />
                </span>
          );
        }
      }
    </DatePicker>);
  }
}

export default class RangeCalendar extends React.Component {
  static propTypes = {
    startValue: PropTypes.object,
    endValue: PropTypes.object,
    value: PropTypes.object,
    defaultCalendarValue: PropTypes.object,
    disabled: PropTypes.bool,
    showDateInput: PropTypes.bool,
    showTime: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  };

  onChange = (field, value) => {
    this.props.onChange(field, value);
  };

  disabledEndDate = (endValue) => {
    if (!endValue) {
      return false;
    }
    const startValue = this.props.startValue;
    if (!startValue) {
      return false;
    }
    return this.props.showTime ? endValue.isBefore(startValue) :
      endValue.diff(startValue, 'days') <= 0;
  };

  disabledStartDate = (startValue) => {
    if (!startValue) {
      return false;
    }
    const endValue = this.props.endValue;
    if (!endValue) {
      return false;
    }
    return this.props.showTime ? endValue.isBefore(startValue) :
      endValue.diff(startValue, 'days') <= 0;
  };

  render() {
    const { startValue, endValue, showTime, showDateInput, disabled } = this.props;
    return (<div style={{ width: 240, margin: 20 }}>
      <p>
        Start：
        <Picker
          showTime={showTime}
          disabledDate={this.disabledStartDate}
          value={startValue}
          onChange={this.onChange.bind(this, 1)}
          showDateInput={showDateInput}
          disabled={disabled}
        />
      </p>

      <p>
        End：
        <Picker
          showTime={showTime}
          disabledDate={this.disabledEndDate}
          value={endValue}
          onChange={this.onChange.bind(this, 0)}
          showDateInput={showDateInput}
          disabled={disabled}
        />
      </p>
    </div>);
  }
}