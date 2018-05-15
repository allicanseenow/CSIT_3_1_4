import React, { Component }                                       from 'react';
import DisplayCarListingComponent                                 from './DisplayCarListingComponent';

export default class DisplayCarListingContainer extends Component {
  state = {
    showReviewPopup: false,
  };

  getCarDetail = () => {
    const { axios } = this.props;
    const listingId = this.props.computedMatch.params.carListingId;
    axios().get(`api/list/${listingId}`)
      .then(({ data }) => {
        const { available, car, carListingNumber, price, rating } = data;
        this.setState({ ...car, carListingNumber, price, rating, available });
      });
  };

  getReview = () => {
    const { axios } = this.props;
    const listingId = this.props.computedMatch.params.carListingId;
    axios().get(`api/review/${listingId}`)
      .then(({ data }) => {
        this.setState({ ratings: data });
      });
  };

  componentDidMount() {
    this.getCarDetail();
    this.getReview();
  }

  onTogglePopup = (showPopup) => {
    this.setState({ showReviewPopup: showPopup })
  };

  onSubmitReview = (review) => {
    const { redirectAxios, computedMatch, location } = this.props;
    const listingId = computedMatch.params.carListingId;
    redirectAxios(location.pathname).post(`api/review/${listingId}`, {
      ...review,
    })
    .then(({ data }) => {
      this.onTogglePopup(false);
      this.getCarDetail();
      this.getReview();
    });
  };

  render() {
    const {
      brand, capacity, colour, img, carListingNumber, location, model, odometer, price, rating, rego, transType, year,
      ratings,
      showReviewPopup,
    } = this.state;
    console.log('PROPS stateh ere is ', this.props)
    return (
      <DisplayCarListingComponent
        brand={brand}
        capacity={capacity}
        colour={colour}
        img={img}
        listingNumber={carListingNumber}
        location={location}
        model={model}
        odometer={odometer}
        price={price}
        rating={rating}
        rego={rego}
        transType={transType}
        year={year}
        ratings={ratings}
        onTogglePopup={this.onTogglePopup}
        showReviewPopup={showReviewPopup}
        onSubmitReview={this.onSubmitReview}
      />
    )
  }
}