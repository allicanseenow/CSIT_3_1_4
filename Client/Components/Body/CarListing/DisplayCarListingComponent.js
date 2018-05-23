import React, { Component }                                       from 'react';
import PropTypes                                                  from 'prop-types';
import { Grid, Col, Row, Button }                                 from 'react-bootstrap';
import { Button as AntdButton, Icon, Modal }                      from 'antd';
import { Link }                                                   from 'react-router-dom';
import { Button as AntButton, Alert, Rate }                       from 'antd';
import {
  FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  RedditShareButton, RedditIcon,
  EmailShareButton, EmailIcon
}                                                                 from 'react-share';
import UserReviewComponent                                        from '../../RecyclableComponents/UserReviewComponent';
import ReviewListingComponent                                     from "./ReviewListingComponent";
import BookingComponent from "./BookingComponent";


export default class DisplayCarListingComponent extends Component {
  static propTypes = {
    onTogglePopup: PropTypes.func.isRequired,
    onSubmitReview: PropTypes.func.isRequired,
    showReviewPopup: PropTypes.bool.isRequired,
    showBookingPanel: PropTypes.bool.isRequired,
    openShareButtonModal: PropTypes.bool.isRequired,
    onOkBook: PropTypes.func.isRequired,
    onCancelBook: PropTypes.func.isRequired,
    handleOpenShareButtonModal: PropTypes.func.isRequired,
  };

  state = {
    reviews: null,
    ratings: null,
  };

  openShareButtonModal = () => {
    this.props.handleOpenShareButtonModal(true);
  };

  closeShareButtonModal = () => {
    this.props.handleOpenShareButtonModal(false);
  };

  renderShareButton = () => {
    const currentURL = window.location.href;
    const title = 'Check out this car listing';
    const buttonProperty = {
      url: currentURL,
      title: title,
      qoute: title,
      subject: title,
    };
    const iconProperty = {
      size: 36,
      round: true,
    };

    return (
      <div className="car-listing_share-button_popup_content">
        <div className="car-listing_share-button_popup_content_header">
          <div className="car-listing_share-button_popup_content_header_title">
            <h1>Share</h1>
            <h5>Share this car listing on social media</h5>
          </div>
        </div>
        <div className="car-listing_share-button_popup_content_first">
          <FacebookShareButton {...buttonProperty}>
            <div className="car-listing_share-button_popup_content_first_img">
              <FacebookIcon {...iconProperty} />
            </div>
            <div className="car-listing_share-button_popup_content_first_txt">Facebook</div>
          </FacebookShareButton>
        </div>
        <div className="car-listing_share-button_popup_content_next">
          <TwitterShareButton {...buttonProperty}>
            <div className="car-listing_share-button_popup_content_next_img">
              <TwitterIcon {...iconProperty}/>
            </div>
            <div className="car-listing_share-button_popup_content_next_txt">
              Twitter
            </div>
          </TwitterShareButton>
        </div>
        <div className="car-listing_share-button_popup_content_next">
          <EmailShareButton {...buttonProperty}>
            <div className="car-listing_share-button_popup_content_next_img">
              <EmailIcon {...iconProperty}/>
            </div>
            <div className="car-listing_share-button_popup_content_next_txt">
              Email
            </div>
          </EmailShareButton>
        </div>
        <div className="car-listing_share-button_popup_content_next">
          <RedditShareButton {...buttonProperty}>
            <div className="car-listing_share-button_popup_content_next_img">
              <RedditIcon {...iconProperty}/>
            </div>
            <div className="car-listing_share-button_popup_content_next_txt">
              Reddit
            </div>
          </RedditShareButton>
        </div>
      </div>
    )
  };

  render() {
    const {
      brand, capacity, colour, img, listingNumber, location, model, odometer, price, rating, rego, transType, year, ratings, available, owner,
      onTogglePopup, showReviewPopup, onSubmitReview, onClickBook, showBookingPanel, onOkBook, onCancelBook, bookingSent, handleOpenShareButtonModal,
      openShareButtonModal,
    } = this.props;
    const { reviews } = this.state;
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
            <div className="car-image" style={{backgroundImage: `url(http://localhost:8080/${img})`}}>
              <div className="car-listing_share-button-container">
                <AntdButton size="large" className="car-listing_share-button" onClick={this.openShareButtonModal}><Icon type="upload"/>Share</AntdButton>
                <Modal
                  className="car-listing_share-button_popup"
                  visible={openShareButtonModal}
                  onCancel={this.closeShareButtonModal}
                  footer={null}
                >
                  { this.renderShareButton() }
                </Modal>
              </div>
            </div>
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
                        <Link to={{ pathname: `/chat/${owner}`, state: { previousListing: listingNumber }} }><Button bsStyle="info" style={{ marginLeft: "10px" }}>Chat with owner</Button></Link>
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
                          <div className="car-content-panel-wrapper_averageReview"><Rate value={rating} disabled /></div>
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
                  {(!_.isEmpty(ratings) && _.map(ratings, (rating) => {
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