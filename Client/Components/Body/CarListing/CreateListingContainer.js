import React, { Component }                 from 'react';
import { connect }                          from 'react-redux';
import PropTypes                            from 'prop-types';
import CreateListingComponent               from './CreateListingComponent';
import _ from "lodash";

export default class CreateListingContainer extends Component {

  state = {
    brandName: '',
    model: '',
    transmission: '',
    odometer: '',
    year: '',
    rego: '',
    unavailableDate: '',
    uploadPic: '',
    startDate: null,
    endDate: null,

    errors: {},
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onBlur = (event) => {
    if (_.isEmpty(event.target.value)) {
      const newErr = _.merge({}, this.state, { errors: {[event.target.name]: 'This field is required' }});
      this.setState({ errors: newErr });
    }
    else {
      const newErr = _.merge({}, this.state, { errors: {[event.target.name]: '' }});
      this.setState({ errors: newErr });
    }
  };

  onCalendarChange = (calendarName, value) => {
    this.setState({ [calendarName]: value })
  };

  render() {
    const carListingDetail = this.state;
    return (
      <CreateListingComponent
        carListingDetail={carListingDetail}
        onChange={this.onChange}
        onBlur={this.onBlur}
        errors={this.state.errors}
        onCalendarChange={this.onCalendarChange}
      />
    )
  }
}