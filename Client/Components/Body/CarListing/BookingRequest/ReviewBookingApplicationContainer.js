import React, { Component }                                       from 'react';
import _                                                          from 'lodash';
import ReviewBookingApplicationComponent                          from './ReviewBookingApplicationComponent';
import Loading                                                    from '../../../RecyclableComponents/Loading';

export default class ReviewBookingApplicationContainer extends Component {
  state = {
    loading: true,
    bookingRequests: [],
    openConfirmBookingModal: false,
    /**
     * chosenListing = {
     *    renter: a string,
     *    listingNum: a number,
     *    status: 'reject' or 'accept',
     * }
     * chosenListing is null if (openConfirmBookingModal === null)
     */
    chosenListing: null,
  };

  fetchBookingRequest = () => {
    const { axios } = this.props;
    axios().get(`api/request`)
      .then(({ data }) => {
        const listingId = this.props.computedMatch.params.carListingId;
        const allBookingRequest = data && data.bookingRequests;
        const selectedListingRequest = _.values(_.pickBy(allBookingRequest, (value, key) => {
          return value && value.listingNum === +listingId;
        }));
        this.setState({ bookingRequests: selectedListingRequest, loading: false });
      });
  };

  componentDidMount() {
    this.fetchBookingRequest();
  }

  openAcceptModal = (renter, listingNum) => {
    const chosenListing = { renter, listingNum, status: 'accept' };
    this.setState({ openConfirmBookingModal: true, chosenListing });
  };

  openRejectModal = (renter, listingNum) => {
    const chosenListing = { renter, listingNum, status: 'reject' };
    this.setState({ openConfirmBookingModal: true, chosenListing });
  };

  handleAccept = () => {
    const { axios } = this.props;
    const { chosenListing } = this.state;
    const { renter, listingNum } = chosenListing;
    axios().post(`api/approve/${renter}/${listingNum}`)
      .then(({ data }) => {
        this.setState({ openConfirmBookingModal: false }, () => {
          this.fetchBookingRequest();
        });
      })
  };

  handleReject = () => {
    const { axios } = this.props;
    const { chosenListing } = this.state;
    const { renter, listingNum } = chosenListing;
    axios().delete(`api/reject/${renter}/${listingNum}`)
      .then(({ data }) => {
        this.setState({ openConfirmBookingModal: false }, () => {
          this.fetchBookingRequest();
        });
      })
  };

  cancelReviewModal = () => {
    this.setState({ chosenListing: null, openConfirmBookingModal: false });
  };

  render() {
    if (this.state.loading) {
      return (
        <Loading/>
      );
    }
    const { bookingRequests, openConfirmBookingModal, chosenListing } = this.state;
    return (
      <ReviewBookingApplicationComponent
        bookingRequests={bookingRequests}
        handleAccept={this.handleAccept}
        handleReject={this.handleReject}
        openAcceptModal={this.openAcceptModal}
        openRejectModal={this.openRejectModal}
        openConfirmBookingModal={openConfirmBookingModal}
        chosenListing={chosenListing}
        cancelReviewModal={this.cancelReviewModal}
      />
    )
  }
}