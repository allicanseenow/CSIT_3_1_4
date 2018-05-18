import React, { PureComponent }                                       from 'react';
import PropTypes                                                  from 'prop-types';
import { List, Button as AntButton, Avatar, Modal }               from 'antd';
import { Grid, Col, Row }                                         from 'react-bootstrap';
import { Link }                                                   from 'react-router-dom';
const { confirm } = Modal;

export default class ReviewBookingApplicationComponent extends PureComponent {
  static propTypes = {
    openAcceptModal: PropTypes.func.isRequired,
    handleAccept: PropTypes.func.isRequired,
    openRejectModal: PropTypes.func.isRequired,
    handleReject: PropTypes.func.isRequired,
    cancelReviewModal: PropTypes.func.isRequired,
    bookingRequests: PropTypes.array.isRequired,
    openConfirmBookingModal: PropTypes.bool.isRequired,
    chosenListing: PropTypes.object.isRequired,
  };

  showHeader = () => {
    return (
      <div className="display-car-listing-collection_header">
        <div className="display-car-listing-collection_header_title">
          <div className="display-car-listing-collection_header_title_cell">
            <div className="display-car-listing-collection_header_title_cell_word">
              <h3 className="display-car-listing-collection_header_title_cell_word_h3">
                All booking requests for this car listing
              </h3>
            </div>
          </div>
        </div>
        <Link to="/car-listings"><div>Back to the car listing page</div></Link>
      </div>
    )
  };

  openAcceptModal = (renter, listingNum) => {
    this.props.openAcceptModal(renter, listingNum);
  };

  openRejectModal = (renter, listingNum) => {
    this.props.openRejectModal(renter, listingNum);
  };

  renderEachBooking = (item) => {
    const { from, to, listingNum, renter, totalPrice } = item;
    return (
      <List.Item>
        <Grid fluid style={{margin: "0 -15px", width: "100%"}}>
          <Row className="display-car-listing-collection_block vertical-align">
            <Col xs={2} className="display-car-listing-collection_block_cell">
              <Link to={`/display-car-listing/`}>
                <Avatar
                  size="large"
                  icon="user"
                  shape="square"
                />
              </Link>
            </Col>
            <Col xs={7} className="display-car-listing-collection_block_cell review-booking-request">
              <div style={{display: "table"}}>
                <div><b>Renter:</b> {renter}</div>
                <div>
                  <div><b>Renting period:</b></div>
                  <ul style={{ marginBottom: 0, paddingLeft: "30px" }}>
                    <li><span><b>From:</b> {from.day}-{from.month}-{from.year}</span></li>
                    <li><span><b>To:</b> {to.day}-{to.month}-{to.year}</span></li>
                  </ul>
                </div>
                <div><b>Total price:</b> {totalPrice}</div>
              </div>
            </Col>
            <Col xs={3} className="display-car-listing-collection_block_cell">
              <Row>
                <Col xs={12} sm={6}><AntButton type="primary" onClick={() => { this.openAcceptModal(renter, listingNum) }}>Accept</AntButton></Col>
                <Col xs={12} sm={6}><AntButton type="danger" onClick={() => { this.openRejectModal(renter, listingNum) }}>Reject</AntButton></Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </List.Item>
    )
  };

  showBody = () => {
    const { bookingRequests } = this.props;
    return (
      <div className="scrollable-div">
        <List
          bordered
          dataSource={bookingRequests}
          renderItem={this.renderEachBooking}
        />
      </div>
    )
  };

  componentDidUpdate(prevProps) {
    const { openConfirmBookingModal, chosenListing, handleAccept, handleReject, cancelReviewModal } = this.props;
    if (!prevProps.openConfirmBookingModal && this.props.openConfirmBookingModal) {
      /**
       * If status is true, this is an "ACCEPT" modal. Otherwise, it is a "REJECT" modal
       */
      let status, bookingConfirmTitle, action;
      if (openConfirmBookingModal) {
        status = chosenListing.status === 'accept';
        let statusTitle;
        if (status) {
          statusTitle = 'accept';
          action = handleAccept;
        }
        else {
          statusTitle = 'reject';
          action = handleReject;
        }
        bookingConfirmTitle = `Do you want to ${statusTitle.toUpperCase()} the booking request from user "${chosenListing.renter}"?`
        confirm({
          title: bookingConfirmTitle,
          content: null,
          okText: 'Confirm',
          cancelText: 'Cancel',
          onOk: action,
          onCancel: cancelReviewModal,
          destroyOnClose: true,
        })
      }
    }
  }

  render() {
    return (
      <div className="display-car-listing-collection">
        { this.showHeader() }
        { this.showBody() }
      </div>
    )
  }
}