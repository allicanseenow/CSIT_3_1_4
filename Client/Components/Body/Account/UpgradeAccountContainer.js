import React, { Component }                 from 'react';
import UpgradeAccountComponent              from './UpgradeAccountComponent';
import _ from "lodash";
import {validateCreateListing} from "../../Utility/Validator";

export default class UpgradeAccountContainer extends Component {
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
    bsb: '',
    accountNumber: '',
    bankAccountName: '',

    errors: {},
    submitError: null,
    submitting: false,
    showSuccessBanner: false,
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

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onImageChange = (fileList) => {
    let newErr = this.state.errors;
    if (_.isEmpty(fileList)) {
      newErr = _.merge({}, this.state.errors, {fileList: 'This field is required' });
    }
    else {
      newErr = _.merge({}, this.state.errors, {fileList: null });
    }
    this.setState({ fileList, errors: newErr });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { axios } = this.props;
    const { brandName, model, transmission, odometer, year, rego, capacity, location, colour, bsb, accountNumber, fileList, errors } = this.state;
    const validate = validateCreateListing({ brandName, model, transmission, odometer, year, rego, capacity, location, colour, fileList, bsb, accountNumber }, true);
    if (validate.isValid) {
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
        accountNumber,
        bsb,
      }));
      this.setState({ submitting: true }, () => {
        axios().put('api/upgrade', formData)
          .then((res) => {
            this.setState({ submitError: null, showSuccessBanner: true }, () => {
              window.scrollTo(0, 0);
            });
          })
          .catch(({ response }) => {
            const errorMsg = response && response.data && response.data.message;
            this.setState({ submitError: errorMsg }, () => {
              window.scrollTo(0, 0);
            });
          })
          .finally(() => {
            this.setState({ errors: validate.errors, submitting: false });
          })
      });
    }
    else {
      this.setState({ errors: validate.errors });
    }
  };

  componentWillMount() {
    this.setState({
      brandName: 'Audi',
      model: 'model',
      transmission: 'auto',
      odometer: '100',
      year: '1998',
      rego: '',
      location: 'Sydney',
      colour: 'Red',
      capacity: '4',
      bsb: '123456',
      accountNumber: '123456789',
      bankAccountName: '1234AjO',
    })
  }

  render() {
    const carListingDetail = this.state;
    const { errors, submitError, submitting, showSuccessBanner } = this.state;
    return (
      <UpgradeAccountComponent
        carListingDetail={carListingDetail}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onSubmit={this.onSubmit}
        errors={errors}
        onImageChange={this.onImageChange}
        submitError={submitError}
        submitting={submitting}
        showSuccessBanner={showSuccessBanner}
        // onCalendarChange={this.onCalendarChange}
      />
    );
  }
}
