import 'rc-calendar/assets/index.css';
import '../CSS/RecyclableComponents/Calendar.scss';
import React, { Component }                   from 'react';
import ReactDOM                               from 'react-dom';
import PropTypes                              from 'prop-types';
import Calendar                               from 'rc-calendar';
import DatePicker                             from 'rc-calendar/lib/Picker';
import enUS                                   from 'rc-calendar/lib/locale/en_US';
import 'rc-time-picker/assets/index.css';
import TimePickerPanel                        from 'rc-time-picker/lib/Panel';

import moment                                 from 'moment';
import 'moment/locale/en-au';

const FORMAT = 'DD-MM-YYYY';
const now = moment();

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')}/>;

function getFormat(time) {
  return time ? format : FORMAT;
}

function disabledDate(current) {
  if (!current) {
    return false;
  }
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  // Cannot select days before today
  return current.valueOf() < date.valueOf();
}

export default class Rc_Calendar extends Component {
  static propTypes = {
    calendarName: PropTypes.string.isRequired,
    value: PropTypes.object,
    defaultCalendarValue: PropTypes.object,
    disabled: PropTypes.bool,
    showDateInput: PropTypes.bool,
    showTime: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    defaultCalendarValue: moment(),
    showTime: false,
    showDateInput: false,
    disabled: false,
  };

  onChange = (value) => {
    this.props.onChange(this.props.calendarName, value);
  };

  render() {
    const { showTime, showDateInput, disabled, value } = this.props;
    const calendar = (
      <Calendar
        locale={enUS}
        style={{ zIndex: 1000 }}
        dateInputPlaceholder="Please input"
        formatter={getFormat(showTime)}
        disabledTime={ showTime ? timePickerElement : null }
        defaultValue={now}
        showDateInput={showDateInput}
        disabledDate={disabledDate}
      />
    );
    return (
      <div className="calendar-container">
        <DatePicker
          animation="slide-up"
          disable={disabled}
          calendar={calendar}
          value={value}
          onChange={this.onChange}
        >
          { ({ value }) => {
            console.log('value now is ', value)
            return (
              <input
                placeholder="DD-MM-YYYY"
                style={{ width: "250px" }}
                disabled={disabled}
                readOnly
                tabIndex="-1"
                className="ant-calendar-picker-input ant-input"
                value={(value && value.format(getFormat(showTime)) || '')}
              />
            )
          }}
        </DatePicker>
      </div>
    );
  }
}
