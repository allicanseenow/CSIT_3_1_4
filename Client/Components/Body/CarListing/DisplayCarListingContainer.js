import React, { Component }                                       from 'react';
import DisplayCarListingComponent                                 from './DisplayCarListingComponent';

export default class DisplayCarListingContainer extends Component {
  state = {
    showReviewPopup: false,
    showBookingPanel: false,
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

  onClickBook = (event) => {
    this.setState({ showBookingPanel: true });
  };

  onOkBook = (e, time) => {
    const { redirectAxios, computedMatch, location } = this.props;
    const listingId = computedMatch.params.carListingId;
    redirectAxios(location.pathname).post(`api/request`, {
      listingNumber: listingId,
      from: time[0],
      to: time[1],
    })
    .then(({ data }) => {
      this.setState({ bookingSent: true, showBookingPanel: false });
    })
  };

  onCancelBook = (e) => {
    this.setState({ showBookingPanel: false });
  };

  render() {
    const {
      brand, capacity, colour, img, carListingNumber, location, model, odometer, price, rating, rego, transType, year, available, owner,
      ratings, bookingSent,
      showReviewPopup, showBookingPanel,
    } = this.state;
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
        available={available}
        owner={owner}
        onTogglePopup={this.onTogglePopup}
        showReviewPopup={showReviewPopup}
        onSubmitReview={this.onSubmitReview}
        onClickBook={this.onClickBook}
        showBookingPanel={showBookingPanel}
        onOkBook={this.onOkBook}
        onCancelBook={this.onCancelBook}
        bookingSent={bookingSent}
      />
    )
  }
}