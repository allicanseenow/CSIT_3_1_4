import React, { Component }                 from 'react';
import _                                    from 'lodash';
import moment                               from 'moment';
import CreateListingComponent               from './CreateListingComponent';
import { validateCreateCarListing }         from '../../Utility/Validator';

export default class CreateListingContainer extends Component {
  state = {
    rego: '',
    time: [],
    cars: [],
    selectedCar: null,
    errors: {},
    submitError: null,
    submitting: false,
    showSuccessBanner: false,
    loadingCarListing: true,
  };

  componentDidMount() {
    const { axios } = this.props;
    axios().get(`/api/car`)
      .then(({ data })  => {
        this.setState({ cars: data });
      })
      .catch(({ response }) => {
        console.log('Errors with get(/api/car)')
      })
      .finally(() => {
        this.setState({ loadingCarListing: false });
      })
  }

  getAvailableDayArray = () => {
    const { time } = this.state;
    if (_.isEmpty(time)) return null;
    const startDate = time[0];
    const endDate = time[1];
    const dateArray = [];
    const currentDay = startDate.toDate();
    const lastDay = endDate.toDate();
    while (currentDay <= lastDay) {
      dateArray.push(moment(currentDay).format("DD-MM-YYYY"));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    return dateArray;
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { axios } = this.props;
    const { rego, time, errors } = this.state;
    const validate = validateCreateCarListing({ rego, time });
    if (validate.isValid) {
      this.setState({ submitting: true }, () => {
        axios().post('/api/list', {
          rego,
          availableDates: this.getAvailableDayArray(),
        })
        .then(({ response }) => {
          this.setState({ submitError: null, showSuccessBanner: true }, () => {
            window.scrollTo(0, 0);
          });
        })
        .catch(({ response }) => {
          console.log("errors while creating a new car list", response.data.message);
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
    if (event.target.name === 'rego') {
      this.setState({ selectedCar: null })
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  onSelectCar = (event) => {
    this.setState({ [event.target.name]: event.target.value, selectedCar: event.target.value });
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

  onCalendarChange = (value) => {
    this.setState({ time: value });
  };

  render() {
    const carListingDetail = this.state;
    const { errors, submitError, submitting, selectedCar, showSuccessBanner, loadingCarListing } = this.state;
    return (
      <CreateListingComponent
        carListingDetail={carListingDetail}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onSubmit={this.onSubmit}
        errors={errors}
        submitError={submitError}
        submitting={submitting}
        onCalendarChange={this.onCalendarChange}
        onSelectCar={this.onSelectCar}
        selectedCar={selectedCar}
        showSuccessBanner={showSuccessBanner}
        loadingCarListing={loadingCarListing}
      />
    )
  }
}