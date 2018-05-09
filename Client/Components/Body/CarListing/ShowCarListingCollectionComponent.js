import React, { Component }                                       from 'react';
import PropTypes                                                  from 'prop-types';
import { Link }                                          from 'react-router-dom';
import _                                                          from 'lodash';
import { Grid, Col, Row, Button }                                 from 'react-bootstrap';
import { Button as AntButton }                                    from 'antd';

export default class ShowCarListingCollectionComponent extends Component {
  static propTypes = {
    carListings: PropTypes.array.isRequired,
  };

  static defaultProps = {
    carListings: [],
  };

  showHeader = () => {
    return (
      <div className="display-car-listing-collection_header">
        <div className="display-car-listing-collection_header_title">
          <div className="display-car-listing-collection_header_title_cell">
            <div className="display-car-listing-collection_header_title_cell_word">
              <h3 className="display-car-listing-collection_header_title_cell_word_h3">
                All car listings
              </h3>
            </div>
          </div>
        </div>
      </div>
    )
  };

  renderEachListing = (listing) => {
    console.log('listing is ', listing);
    const { carListingNumber, car, } = listing;
    const { brand, model, year, colour, capacity, img } = car;

    return (
      <Row className="display-car-listing-collection_block vertical-align" key={`car-listing-id-${listing.carListingNumber}`}>
        <Col xs={3} className="display-car-listing-collection_block_cell">
          <Link to={`/display-car-listing/${carListingNumber}`}>
            <div className="display-car-listing-collection_img" style={{ backgroundImage: `url(api/${img})` }} />
          </Link>
        </Col>
        <Col xs={6} className="display-car-listing-collection_block_cell">
          <div style={{display: "table"}}>
            <div><b>Brand:</b> {brand}</div>
            <div><b>Model:</b> {model}</div>
            <div><b>Year:</b> {year}</div>
            <div><b>Colour:</b> {colour}</div>
          </div>
        </Col>
        <Col xs={3} className="display-car-listing-collection_block_cell">
          <Row>
            <Col xs={12} sm={6}><AntButton>Update</AntButton></Col>
            <Col xs={12} sm={6}><AntButton>Delete</AntButton></Col>
          </Row>
        </Col>
      </Row>
    )
  };

  renderSmallListings = () => {
    const { carListings } = this.props;
    return (
      <div className="listing-panel">
        { _.isEmpty(carListings) && (
          <div>You have no car listing</div>
        ) || (
          <Grid fluid>
            { _.map(carListings, (listing) => {
              return this.renderEachListing(listing);
            }) }
          </Grid>
        )}
      </div>
    )
  };

  render() {
    return (
      <div className="display-car-listing-collection">
        { this.showHeader() }
        { this.renderSmallListings() }
      </div>
    )
  }
}