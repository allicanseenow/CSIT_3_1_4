import React, { PureComponent }     from 'react';
import PropTypes                from 'prop-types';

export default class ConfirmationNotificationBox extends PureComponent {
  render() {
    return (
      <div className="clearfix">
        <div className="l-mar-top-3 notification notification--success">
          { this.props.children }
        </div>
      </div>
    )
  }
}
