import React, { Component }                                       from 'react';
import PropTypes                                                  from 'prop-types';
import { Grid, Col, Row, Button }                                 from 'react-bootstrap';
import { Button as AntButton, Alert, Rate }                       from 'antd';
import UserReviewComponent                                        from '../../RecyclableComponents/UserReviewComponent';
import ReviewListingComponent                                     from "./ReviewListingComponent";
import ErrorNotificationBox                                       from '../../RecyclableComponents/ErrorNotificationBox';
import BookingComponent from "./BookingComponent";


export default class DisplayCarListingComponent extends Component {
  static propTypes = {
    onTogglePopup: PropTypes.func.isRequired,
    onSubmitReview: PropTypes.func.isRequired,
    showReviewPopup: PropTypes.bool.isRequired,
    showBookingPanel: PropTypes.bool.isRequired,
    onOkBook: PropTypes.func.isRequired,
    onCancelBook: PropTypes.func.isRequired,
  };

  state = {
    reviews: null,
    ratings: null,
  };

  render() {
    const {
      brand, capacity, colour, img, listingNumber, location, model, odometer, price, rating, rego, transType, year, ratings, available,
      onTogglePopup, showReviewPopup, onSubmitReview, onClickBook, showBookingPanel, onOkBook, onCancelBook, bookingSent,
    } = this.props;
    const { reviews } = this.state;
    console.log('this.props ', this.props.available)
    return (
      <div>
        { bookingSent && (
          <Alert
            type="success"
            message="Booking request sent"
            closable
            banner
          />
        )}
        <div className="display-car-listing">
          <div className="image-car-listing">
            <div className="car-image" style={{backgroundImage: `url(http://localhost:8080/${img})`}}/>
          </div>
          <div className="car-listing_body">
            <div className="car-listing_body_content">
              <div className="car-detail-panel-wrapper">
                <div className="car-title-panel-wrapper listing-panel">
                  <Grid fluid>
                    <Row>
                      <Col sm={7} xs={12} className="left-panel">
                        <h3>Model: {model}</h3>
                        <h4>Brand: {brand}</h4>
                        <div>Transmission: {transType}</div>
                        <div>Odometer: {odometer}</div>
                        <div>Year: {year}</div>
                        <div>Capacity: {capacity}</div>
                        <div>Location: {location}</div>
                        <div>Colour: {colour}</div>
                        <div>Year: {year}</div>
                      </Col>
                      <Col sm={1} xsHidden/>
                      <Col sm={4} xs={4} xsOffset={2} smOffset={0}>
                        <Button bsStyle="success" onClick={onClickBook} disabled={bookingSent}>{bookingSent ? 'Booking request sent' : 'Book'}</Button>
                        <BookingComponent
                          showBookingPanel={showBookingPanel}
                          onOkBook={onOkBook}
                          onCancelBook={onCancelBook}
                          available={available}
                        />
                        <div>Price: {price} AUD</div>
                      </Col>
                    </Row>
                  </Grid>
                </div>
                <div className="car-content-panel-wrapper listing-panel">
                  <Grid fluid>
                    <Row>
                      <Col xs={12}>
                        <div><h3>Reviews</h3></div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={7}>
                        <div>
                          <div className="car-content-panel-wrapper_averageReviewTitle"><h5>Average rating:</h5></div>
                          <div className="car-content-panel-wrapper_averageReview"><Rate allowHalf value={rating} disabled /></div>
                        </div>
                      </Col>
                      <Col sm={1}/>
                      <Col sm={4}>
                        <AntButton
                          onClick={() => onTogglePopup(true)}
                        >
                          Write a review
                        </AntButton>
                      </Col>
                    </Row>
                    { showReviewPopup && (
                      <Row>
                        <Col xs={8} xsOffset={2}>
                          <ReviewListingComponent
                            onBlur={onTogglePopup}
                            onSubmit={onSubmitReview}
                          />
                        </Col>
                      </Row>
                    )}
                  </Grid>
                </div>
                <div>
                  {(!_.isEmpty(ratings) && _.map(ratings.slice(0).reverse(), (rating) => {
                    return (
                      <div className="car-review-panel-wrapper listing-panel" key={`rating-review-${rating.reviewer}-${rating.tstamp}`}>
                        <Grid fluid>
                          <Row>
                            <Col>
                              <UserReviewComponent
                                rating={rating}
                              />
                            </Col>
                          </Row>
                        </Grid>
                      </div>
                    );
                  })) || (
                    <div className="car-review-panel-wrapper listing-panel" style={{ padding: "0 15px"}}>
                      There is no review at the moment
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}