import React, { Component } from 'react';
import NavBar               from './Header/NavBar';

export default class Header extends Component {
  render() {
    console.log('render header', this.props)
    return (
      <div>
        <NavBar/>
      </div>
    )
  }
}