import React, { PureComponent }                                       from 'react';
import PropTypes                                                      from 'prop-types';
import { Input, Rate, Button }                                        from 'antd';

const { TextArea } = Input;

export default class ReviewListingComponent extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  };

  state = {
    rating: 0,
    reviewMessage: '',
    error: '',
  };

  /**
   * Check if the rating or reviewMessage is empty before submission
   * @param rating
   * @param reviewMessage
   * @returns {boolean} false if it doesn't pass the submission condition; true otherwise
   */
  checkSubmission = (rating, reviewMessage) => {
    if (!rating) {
      this.setState({ error: 'Need to have a rating before submission'});
      return false;
    }
    else if (_.isEmpty(reviewMessage)) {
      this.setState({ error: 'Need to have a review message before submission'});
      return false;
    }
    return true;
  };

  /**
   * Submit the review if it passes the condition checking
   */
  onSubmit = () => {
    const { rating, reviewMessage } = this.state;
    if (this.checkSubmission(rating, reviewMessage)) {
      this.props.onSubmit({ rating, reviewMessage });
    }
  };

  onClick = (e) => {
    if (e.target === this.putt) {
      this.props.onBlur(false);
    }
  };

  onChangeRate = (value) => {
    this.setState({ rating: value });
  };

  onChangeMsg = (e) => {
    this.setState({ reviewMessage: e.target.value});
  };

  render() {
    const { rating, reviewMessage, error } = this.state;
    return (
      <div className="pop-up" onClick={this.onClick} ref={(input) => this.putt = input}>
        <div className="pop-up_inner">
          <div className="pop-up_inner_content reviewListingComponent">
            <div>Write a review:</div>
            <div className="reviewListingComponent_field">
              <Rate onChange={this.onChangeRate} value={rating} allowClear={false}/>
            </div>
            <div className="reviewListingComponent_field">
              <TextArea
                onChange={this.onChangeMsg}
                value={reviewMessage}
                placeholder={`Please enter a review message for this car listing`}
              />
            </div>
            { error && (
              <div className="reviewListingComponent_field">
                <label>{error}</label>
              </div>
              )}
            <div className="reviewListingComponent_button">
              <Button
                onClick={this.onSubmit}
              >
                Submit review
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}