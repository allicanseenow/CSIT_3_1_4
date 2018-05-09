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
      })
  }

  render() {
    const { carListings } = this.state;
    return (
      <ShowCarListingCollectionComponent
        carListings={carListings}
      />
    )
  }
}