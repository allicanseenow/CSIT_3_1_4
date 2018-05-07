import React, { PureComponent }                                       from 'react';
import PropTypes                                                      from 'prop-types';
import { Input, Rate, Button }                                                      from 'antd';

const { TextArea } = Input;

export default class ReviewListingComponent extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  };

  onSubmit = () => {
    this.props.onSubmit();
  };

  onClick = (e) => {
    if (e.target === this.putt) {
      this.props.onBlur(false);
    }
  };

  render() {
    return (
      <div className="pop-up" onClick={this.onClick} ref={(input) => this.putt = input}>
        <div className="pop-up_inner">
          <div className="pop-up_inner_content">
            <div>Write a review:</div>
            <Rate/>
            <TextArea/>
            <Button
              onClick={this.onSubmit}
            >
              Submit review
            </Button>
          </div>
        </div>
      </div>
    )
  }
}