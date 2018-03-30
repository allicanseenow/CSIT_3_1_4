import React, { Component }                                       from 'react';
import LoginFormm                                                 from './Login_Component';
import './Login.scss';

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