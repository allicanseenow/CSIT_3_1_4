import React, { Component }                                       from 'react';
import DisplayCarListingComponent                                 from './DisplayCarListingComponent';

export default class DisplayCarListingContainer extends Component {
  state = {
    showReviewPopup: false,
  };

  componentWillMount() {
    const { axios } = this.props;
    axios().get(`api/list/${this.props.computedMatch.params.carListingId}`)
      .then(({ data }) => {
        console.log('res is ---', data);
        this.setState({...data});
      })
  }

  onTogglePopup = (showPopup) => {
    this.setState({ showReviewPopup: showPopup })
  };

  onSubmitReview = (e) => {
    this.onTogglePopup(false);
  };

  render() {
    const {
      brand, capacity, colour, img, listingNumber, location, model, odometer, price, rating, rego, transType, year,
      showReviewPopup,
    } = this.state;
    return (
      <DisplayCarListingComponent
        brand={brand}
        capacity={capacity}
        colour={colour}
        img={img}
        listingNumber={listingNumber}
        location={location}
        model={model}
        odometer={odometer}
        price={price}
        rating={rating}
        rego={rego}
        transType={transType}
        year={year}
        onTogglePopup={this.onTogglePopup}
        showReviewPopup={showReviewPopup}
        onSubmitReview={this.onSubmitReview}
      />
    )
  }
}