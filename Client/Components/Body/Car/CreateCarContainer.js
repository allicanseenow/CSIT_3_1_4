import React, { Component }                 from 'react';
import _                                    from 'lodash';
import CreateCarComponent                   from './CreateCarComponent';
import { validateCreateListing }            from '../../Utility/Validator';

export default class CreateCarContainer extends Component {
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
    submitError: null,
    submitting: false,
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
      accountNumber: '',
      bankAccountName: '1234AjO',
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { axios } = this.props;
    const { brandName, model, transmission, odometer, year, rego, capacity, location, colour, fileList, errors } = this.state;
    const validate = validateCreateListing({ brandName, model, transmission, odometer, year, rego, capacity, location, colour, fileList });
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
      }));
      this.setState({ submitting: true }, () => {
        axios().post('http://localhost:9000/api/car', formData)
          .then((res) => {
            this.setState({ submitError: null, })
          })
          .catch(({ response }) => {
            console.log("errors while creating a new car list", response.data);
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
    let newErr = this.state.errors;
    if (_.isEmpty(fileList)) {
      newErr = _.merge({}, this.state.errors, {fileList: 'This field is required' });
    }
    else {
      newErr = _.merge({}, this.state.errors, {fileList: null });
    }
    this.setState({ fileList, errors: newErr });
  };

  render() {
    const carListingDetail = this.state;
    const { errors, submitError, submitting } = this.state;
    return (
      <CreateCarComponent
        carListingDetail={carListingDetail}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onSubmit={this.onSubmit}
        errors={errors}
        onImageChange={this.onImageChange}
        submitError={submitError}
        submitting={submitting}
        // onCalendarChange={this.onCalendarChange}
      />
    )
  }
}