import React, { PureComponent }                     from 'react';
import PropTypes                                    from 'prop-types';
import { DatePicker, Modal }                        from 'antd';
import _                                            from "lodash";
import moment                                       from "moment/moment";
import Loading                                      from '../../RecyclableComponents/Loading';

const { RangePicker } = DatePicker;

export default class BookingComponent extends PureComponent {
  static propTypes = {
    available: PropTypes.array,
    showBookingPanel: PropTypes.bool.isRequired,
    onOkBook: PropTypes.func.isRequired,
    onCancelBook: PropTypes.func.isRequired,
    loadingListingData: PropTypes.bool,
  };

  static defaultProps = {
    loadingListingData: false,
  };

  state = {
    time: [],
  };

  onCalendarChange = (value) => {
    this.setState({ time: value });
  };

  onSubmit = (e) => {
    const { time } = this.state;
    if (time.length) {
      const parsedTime = [
        time[0].format("DD-MM-YYYY"),
        time[1].format("DD-MM-YYYY"),
      ];
      this.props.onOkBook(e, parsedTime);
    }
  };

  onCancel = (e) => {
    this.props.onCancelBook(e);
  };

  static getAvailableDates = (available) => {
    const availableDates = _.sortBy(_.map(available, (t) => {
      const { year, month, day } = t;
      return moment(`${year}-${month}-${day}`, "YYYY-MM-DD");
    }));
    return availableDates;
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.available && nextProps.available !== prevState.available) {
      return {
        available: BookingComponent.getAvailableDates(nextProps.available),
      };
    }
    return null;
  }

  disabledDates = (current) => {
    const { available } = this.state;
    let isCurrentAvailable = false;
    if (available) {
      _.forEach(available, (date) => {
        if (current.isSame(date, 'day')) {
          isCurrentAvailable = true;
          return false;
        }
      })
    }
    return !isCurrentAvailable || current && current < moment().endOf('day');
  };

  render() {
    const { showBookingPanel, loadingListingData } = this.props;
    return (
      <Modal
        title="Car booking request"
        visible={showBookingPanel}
        onCancel={this.onCancel}
        onOk={this.onSubmit}
        animation={false}
      >
        { loadingListingData && (
          <Loading/>
        ) || (
          <div>
            <div><label>Select a time period for booking</label></div>
            <RangePicker
              value={this.state.time}
              onChange={this.onCalendarChange}
              format="DD-MM-YYYY"
              disabledDate={this.disabledDates}
            />
          </div>
        ) }
      </Modal>
    )
  }
}