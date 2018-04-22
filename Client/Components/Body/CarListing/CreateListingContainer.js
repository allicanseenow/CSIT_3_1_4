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
    startAvailableDate: null,
    endAvailableDate: null,

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

  onCalendarChange = (isStart, value) => {
    if (isStart) {
      this.setState({ startAvailableDate: value })
    }
    else {
      this.setState({ endAvailableDate: value })
    }
  };

  render() {
    const carListingDetail = this.state;
    console.log("Calendar is ", this.state.startAvailableDate&&this.state.startAvailableDate.format('DD-MM-YYYY'))
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