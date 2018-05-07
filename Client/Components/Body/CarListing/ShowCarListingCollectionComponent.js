import React, { Component }                                       from 'react';
import PropTypes                                                  from 'prop-types';
import { Grid, Col, Row, Button }                                 from 'react-bootstrap';

export default class ShowCarListingCollectionComponent extends Component {

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

  renderEachListing = () => {
    return (
      <Row>
        <Col xs={3}>

        </Col>
        <Col xs={5}>

        </Col>
        <Col xs={4}>
          <Row>
            <Col xs={12} sm={6}><Button>Update</Button></Col>
            <Col xs={12} sm={6}><Button>Delete</Button></Col>
          </Row>
        </Col>
      </Row>
    )
  };

  renderSmallListings = () => {
    return (
      <div className="listing-panel">
        <Grid fluid>
          { this.renderEachListing() }
        </Grid>
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