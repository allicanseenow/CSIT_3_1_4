import React, { Component }                                       from 'react';
import PropTypes                                                  from 'prop-types';
import { Grid, Col, Row, Button }                                 from 'react-bootstrap';
import { Button as AntButton }                                    from 'antd';
import { Rate }                                                   from 'antd';
import UserReviewComponent                                        from '../../RecyclableComponents/UserReviewComponent';
import ReviewListingComponent                                     from "./ReviewListingComponent";


export default class DisplayCarListingComponent extends Component {
  static propTypes = {
    onTogglePopup: PropTypes.func.isRequired,
    onSubmitReview: PropTypes.func.isRequired,
    showReviewPopup: PropTypes.bool.isRequired,
  };

  state = {
    reviews: null,
  };

  render() {
    const {
      brand, capacity, colour, img, listingNumber, location, model, odometer, price, rating, rego, transType, year,
      onTogglePopup, showReviewPopup, onSubmitReview,
    } = this.props;
    const { reviews } = this.state;
    return (
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
                      <Button bsStyle="success">Book</Button>
                      <div>Price: {price} AUD</div>
                    </Col>
                  </Row>
                </Grid>
              </div>
              <div className="car-content-panel-wrapper listing-panel">
                <Grid fluid>
                  <Row>
                    <Col xs={12}>
                      <div>Reviews</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={7}>
                      <span>Rating:</span>
                      <Rate defaultValue={rating} disabled/>
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
              <div className="car-review-panel-wrapper listing-panel">
                <Grid fluid>
                  {reviews && _.forEach(reviews, (review) => {
                    return (
                      <Row>
                        <Col>
                          <UserReviewComponent />
                        </Col>
                      </Row>
                    )
                  }) || (
                    <div>
                      There is no review at the moment
                    </div>
                  )}
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}