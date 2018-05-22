import React, { Component }                 from 'react';
import { connect }                          from 'react-redux';
import PropTypes                            from 'prop-types';
import SearchComponent                      from './SearchComponent';

class SearchContainer extends Component {
  static propTypes = {
    carListing: PropTypes.object.isRequired,
  };

  state = {
    openBookingModal: false,
    loadingListingData: false,
    currentListingNumber: null,
    bookingSent: false,
  };

  /**
   * Function is used to open the booking modal
   * @param listingNumber listing number of the car listing to be booked
   */
  onClickBook = (listingNumber) => {
    const { axios } = this.props;
    this.setState({ openBookingModal: true, loadingListingData: true, currentListingNumber: listingNumber }, () => {
      axios().get(`api/list/${listingNumber}`)
        .then(({ data }) => {
          this.setState({ carListingDetail: data, loadingListingData: false });
        });
    });
  };

  /**
   * If user clicks button to book this car listing
   * @param e
   * @param time
   */
  onOkBook = (e, time) => {
    const { redirectAxios, location } = this.props;
    const listingId = this.state.currentListingNumber;
    redirectAxios(location.pathname).post(`api/request`, {
      listingNumber: listingId,
      from: time[0],
      to: time[1],
    })
      .then(({ data }) => {
        this.setState({ bookingSent: true, openBookingModal: false });
      })
  };

  /**
   * If user wants to close the booking modal without booking the car listing
   */
  onCancelBook = () => {
    this.setState({ openBookingModal: false });
  };

  closeSuccessMessage = () => {
    this.setState({ bookingSent: false });
  };

  render() {
    const { carListing } = this.props;
    const { openBookingModal, loadingListingData, carListingDetail, bookingSent } = this.state;
    const available = carListingDetail && carListingDetail.available;
    return (
      <SearchComponent
        onClickBook={this.onClickBook}
        carListing={carListing}
        loadingListingData={loadingListingData}
        openBookingModal={openBookingModal}
        onOkBook={this.onOkBook}
        onCancelBook={this.onCancelBook}
        available={available}
        bookingSent={bookingSent}
        closeSuccessMessage={this.closeSuccessMessage}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return { carListing: state && state.mainPage && state.mainPage.listing };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);