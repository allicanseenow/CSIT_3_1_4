import React, { Component }                                       from 'react';

export default class Login extends Component {
  render() {
    console.log('THis props inside login is ', this.props);
    return (
      <div>
        Hello
      </div>
    )
  }
}