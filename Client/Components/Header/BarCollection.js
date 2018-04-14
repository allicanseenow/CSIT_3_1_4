import React, { Component }           from 'react';
import { Route }                      from 'react-router-dom';
import SearchBar                      from './SearchBar';
import NavBar                         from './NavBar';

import { Consumer }                   from '../../main';

export default class BarCollection extends Component {
  render() {
    return (
      <div className="navbar-fixed-top">
        <NavBar {...this.props}/>
        <Route exact path="/" render={() => {
          return (
            <Consumer>
              { context => {
                console.log("context is ", context);
                return <SearchBar {...this.props} {...context} />
              }}
            </Consumer>
          )
        }} />
      </div>
    )
  }
}