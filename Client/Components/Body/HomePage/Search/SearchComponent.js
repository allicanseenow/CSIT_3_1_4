import React, { Component }                 from 'react';
import { Grid, Row, Col }                   from 'react-bootstrap';
import { Link }                             from 'react-router-dom';
import { Button, Rate }                           from 'antd';

export default class SearchComponent extends Component {

  renderImage = (imgLing, carListingNumber) => {
    return (
      <Link to={`display-car-listing/${carListingNumber}`}>
        <div className="search-card-image" style={{ backgroundImage : `url("api/${imgLing}")`}} />
      </Link>
    )
  };

  renderCard = (listingDetail) => {
    const { carListingNumber, price, rating, car } = listingDetail;
    const { rego, brand, location, model, transType, year, img, colour, capacity } = car;
    return (
      <div key={`listing-${carListingNumber}`}>
        <Col sm={1}/>
        <Col sm={5}>
          <div className="search-card">
            { this.renderImage(img, carListingNumber) }
            <div className="search-card-block">
              <Col xs={8}>
                <div>
                  <label>Brand: </label>
                  <span> {brand}</span>
                </div>
                <div>
                  <label>Model: </label>
                  <span> {model}</span>
                </div>
                <div>
                  <label>Location: </label>
                  <span> {location}</span>
                </div>
                <div>
                  <label>Capacity: </label>
                  <span> {capacity}</span>
                </div>
                <div>
                  <span>${price} AUD/day</span>
                </div>
                <div>
                  <Rate disabled defaultValue={rating}/>
                </div>
              </Col>
              <Col xs={4} className="search-card-block_button_wrapper">
                <Button type="primary" className="search-card-block_button">Book</Button>
                <Link to={`display-car-listing/${carListingNumber}`}>
                  <Button className="search-card-block_button">Details</Button>
                </Link>
              </Col>
            </div>
          </div>
        </Col>
      </div>
    )
  };
  render() {
    const { carListing } = this.props;
    console.log('carlisting is ', carListing);
    if (!carListing) {
      return (
        <div>There is no car found</div>
      );
    }
    return (
      <div className="search-container">
        <Grid>
          <Row>
            { _.map(carListing, (eachListing) => {
              return this.renderCard(eachListing);
            })}
          </Row>
        </Grid>
      </div>
    )
  }
}