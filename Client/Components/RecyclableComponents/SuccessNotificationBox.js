import React, { PureComponent }     from 'react';

export default class SuccessNotificationBox extends PureComponent {
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