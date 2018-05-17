import React, { Component }                                       from 'react';
import ReviewBookingApplicationComponent                          from './ReviewBookingApplicationComponent';

export default class ReviewBookingApplicationContainer extends Component {
  render() {
    console.log("this.props, ", this.props)
    return (
      <ReviewBookingApplicationComponent

      />
    )
  }
}