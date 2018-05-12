import React, { Component }                                       from 'react';
import PropTypes                                                  from 'prop-types';
import ShowCarListingCollectionComponent                          from "./ShowCarListingCollectionComponent";

export default class ShowCarListingCollectionContainer extends Component {
  state = {

  };

  componentWillMount() {
    const { axios } = this.props;
    axios().get('api/list')
      .then(({ data }) => {
        this.setState({ carListings: data });
      })
      .catch(({ response }) => {
        console.log('Error ', response.data.message);
        const errorMsg = response && response.data && response.data.message;
        this.setState({ submitError: errorMsg });
      })
  }

  onDeleteListing = (listingNumb) => {
    const { axios } = this.props;
    axios().delete(`api/list/${listingNumb}`)
      .then()
      .catch(({ response }) => {
        const errorMsg = response && response.data && response.data.message;
        this.setState({ submitError: errorMsg });
      });
  };

  onUpdateListing = (listingNumb) => {
    this.props.history.push(`edit-car-listing/${listingNumb}`);
  };

  render() {
    const { carListings, submitError } = this.state;
    return (
      <ShowCarListingCollectionComponent
        carListings={carListings}
        onDeleteListing={this.onDeleteListing}
        onUpdateListing={this.onUpdateListing}
        submitError={submitError}
      />
    )
  }
}