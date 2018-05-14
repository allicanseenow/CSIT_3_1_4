import React, { PureComponent }                                       from 'react';
import PropTypes                                                      from 'prop-types';
import { Grid }                                                       from 'react-bootstrap';
import { Rate }                                                       from 'antd';
import moment                                                         from 'moment';

export default class UserReviewComponent extends PureComponent {
  static propTypes = {
    rating: PropTypes.object.isRequired,
  };

  render() {
    const { reviewMessage, rating, reviewer, listingNum, tstamp } = this.props.rating;
    const time = moment(tstamp, "DD-MM-YYYY").format("DD-MM-YYYY");
    return (
      <div style={{ padding: "0 15px"}}>
        <div className="review-box-component-wrapper">
          <div className="review-box-component-wrapper_element_image">
            <i className="fas fa-user"/>
          </div>
          <div className="review-box-component-wrapper_element">
            <div><label>{reviewer}</label></div>
            <div>{time}</div>
          </div>
        </div>
        <div className="review-box-component-content_wrapper">
          <div>
            <Rate defaultValue={rating} disabled className="review-box-component-content_wrapper_star"/>
          </div>
          <div className="review-box-component-content_wrapper_msg">
            { reviewMessage }
          </div>
        </div>
      </div>
    )
  }
}