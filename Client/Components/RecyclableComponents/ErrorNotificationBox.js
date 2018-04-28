import React, { PureComponent }     from 'react';
import PropTypes                from 'prop-types';

export default class ErrorNotificationBox extends PureComponent {
  render() {
    return (
      <div className="clearfix">
        <div className="l-mar-top-3 notification notification--alert">
          { this.props.children }
        </div>
      </div>
    )
  }
}