import React, { Component }           from 'react';
import { Route }                      from 'react-router-dom';
import SearchBar                      from './SearchBar';
import NavBar                         from './NavBar';

export default class BarCollection extends Component {
  render() {
    return (
      <div className="navbar-fixed-top">
        <NavBar {...this.props}/>
        <Route exact path="/" render={() => {
          return <SearchBar {...this.props}/>
        }} />
      </div>
    )
  }
}