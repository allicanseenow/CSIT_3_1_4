import React, { Component }                 from 'react';
import PropTypes                            from 'prop-types';
import { Grid, Row, Col }                   from 'react-bootstrap';
import { Link }                             from 'react-router-dom';
import { Button, Rate, Alert }                     from 'antd';
import BookingComponent                     from '../../CarListing/BookingComponent';

export default class SearchComponent extends Component {
  static propTypes = {
    onClickBook: PropTypes.func.isRequired,
    onOkBook: PropTypes.func.isRequired,
    onCancelBook: PropTypes.func.isRequired,
    closeSuccessMessage: PropTypes.func.isRequired,
    openBookingModal: PropTypes.bool.isRequired,
    loadingListingData: PropTypes.bool.isRequired,
    bookingSent: PropTypes.bool.isRequired,
    available: PropTypes.array,
  };

  renderImage = (imgLing, carListingNumber) => {
    return (
      <Link to={`display-car-listing/${carListingNumber}`}>
        <div className="search-card-image" style={{ backgroundImage : `url("api/${imgLing}")`}} />
      </Link>
    )
  };

  renderCard = (listingDetail) => {
    const { carListingNumber, price, rating, car, available } = listingDetail;
    const { rego, brand, location, model, transType, year, img, colour, capacity } = car;
    const checkAvailability = !_.isEmpty(available);
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
                <Button type="primary" className="search-card-block_button" onClick={() => { this.props.onClickBook(carListingNumber) }} disabled={!checkAvailability} >{checkAvailability ? 'Book' : 'Expired'}</Button>
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
    const { carListing, openBookingModal, loadingListingData, onOkBook, onCancelBook, available, bookingSent, closeSuccessMessage } = this.props;
    console.log('carlisting is ', carListing);
    if (!carListing) {
      return (
        <div>There is no car found</div>
      );
    }
    return (
      <div>
        <div className="search-container">
          { bookingSent && (
            <div style={{paddingBottom: "20px", position: "relative", bottom: 10 }}>
              <Alert
                message="Booking request sent"
                type="success"
                showIcon
                onClose={closeSuccessMessage}
              />
            </div>
          )}
          <Grid>
            <Row>
              { _.map(carListing, (eachListing) => {
                return this.renderCard(eachListing);
              })}
            </Row>
          </Grid>
          <BookingComponent
            showBookingPanel={openBookingModal}
            onOkBook={onOkBook}
            onCancelBook={onCancelBook}
            loadingListingData={loadingListingData}
            available={available}
          />
        </div>
      </div>
    )
  }
}