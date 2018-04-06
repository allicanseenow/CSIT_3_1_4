import React, { Component } from 'react';
import NavBar               from './Header/NavBar';
import { Consumer }              from '../context';
import './CSS/Header.scss';

export default class Header extends Component {
  render() {
    console.log('render header', this.props)
    return (
      <div className="main-header">
        <Consumer>
          {context => { return <NavBar axios={context.axios}/> }}
        </Consumer>
      </div>
    )
  }
}