import React, { Component }                                       from 'react';
import LoginFormm                                                 from './Login_Component';

export default class Login_Container extends Component {
  render() {
    console.log('THis props inside login is ', this.props);
    return (
      <div>
        <LoginFormm/>
      </div>
    )
  }
}