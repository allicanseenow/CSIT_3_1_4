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
    location: '',
    colour: '',
    fileList: [],


    errors: {},
  };

  onSubmit = (event) => {
    event.preventDefault();
    console.log("All state when submitting is ", this.state);
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onBlur = (event) => {
    console.log('event name is ', event.target.name)
    console.log('event target value is ', event.target.value)
    if (_.isEmpty(event.target.value)) {
      const newErr = _.merge({}, this.state.errors, {[event.target.name]: 'This field is required' });
      this.setState({ errors: newErr });
    }
    else {
      const newErr = _.merge({}, this.state.errors, {[event.target.name]: '' });
      console.log('new erERR in case 2 ', newErr)
      this.setState({ errors: newErr });
    }
  };

  // onCalendarChange = (isStart, value) => {
  //   if (isStart) {
  //     this.setState({ startAvailableDate: value })
  //   }
  //   else {
  //     this.setState({ endAvailableDate: value })
  //   }
  // };

  onImageChange = (fileList) => {
    this.setState({ fileList });
  };

  render() {
    const carListingDetail = this.state;

    return (
      <CreateListingComponent
        carListingDetail={carListingDetail}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onSubmit={this.onSubmit}
        errors={this.state.errors}
        onImageChange={this.onImageChange}
        // onCalendarChange={this.onCalendarChange}
      />
    )
  }
}