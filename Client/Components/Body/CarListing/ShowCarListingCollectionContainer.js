import React, { Component }                                       from 'react';
import ShowCarListingCollectionComponent                          from "./ShowCarListingCollectionComponent";

export default class ShowCarListingCollectionContainer extends Component {
  state = {
    loading: true,
  };

  fetchNewListing = () => {
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
      .finally(() => {
        this.setState({ loading: false });
      })
  };

  componentDidMount() {
    this.fetchNewListing();
  }

  onDeleteListing = (listingNumb) => {
    const { axios } = this.props;
    axios().delete(`api/list/${listingNumb}`)
      .then(() => {
        this.fetchNewListing();
      })
      .catch(({ response }) => {
        const errorMsg = response && response.data && response.data.message;
        this.setState({ submitError: errorMsg });
      });
  };

  onUpdateListing = (listingNumb) => {
    this.props.history.push(`edit-car-listing/${listingNumb}`);
  };

  render() {
    const { carListings, submitError, loading } = this.state;
    return (
      <ShowCarListingCollectionComponent
        carListings={carListings}
        onDeleteListing={this.onDeleteListing}
        onUpdateListing={this.onUpdateListing}
        submitError={submitError}
        loading={loading}
      />
    )
  }
}