import React, { Component }                 from 'react';
import _                                    from 'lodash';
import { connect }                          from 'react-redux';
import PropTypes                            from 'prop-types';
import CreateListingComponent               from './CreateListingComponent';
import { validateCreateListing }            from '../../Utility/Validator';

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
    capacity: '',
    fileList: [],

    errors: {},
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { axios } = this.props;
    const { brandName, model, transmission, odometer, year, rego, capacity, location, colour, fileList, errors } = this.state;
    let formData = new FormData();
    // Need "originFileObj" to get a 'File' object that can be used for submission
    formData.append('listing_img', fileList[0].originFileObj);
    formData.append('data', JSON.stringify({
      brand: brandName,
      rego,
      model,
      location,
      colour,
      transmission,
      capacity,
      year,
      odometer,
    }));
    const validate = validateCreateListing(this.state);
    if (validate.isValid) {
      axios().post('http://localhost:9000/api/list', formData)
        .then((res) => {
        })
        .catch((err) => {
          console.log("errors while creating a new car list", err);

        })
    }
    else {
      this.setState({ errors: validate.errors });
    }
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onBlur = (event) => {
    if (_.isEmpty(event.target.value)) {
      // Don't merge directly to avoid mutating the state
      const newErr = _.merge({}, this.state.errors, {[event.target.name]: 'This field is required' });
      this.setState({ errors: newErr });
    }
    else {
      const newErr = _.merge({}, this.state.errors, {[event.target.name]: '' });
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