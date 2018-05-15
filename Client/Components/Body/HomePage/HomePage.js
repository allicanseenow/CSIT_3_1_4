import React, { Component, createContext } from 'react';
import { connect }                         from 'react-redux';
import { fetch }                           from '../../../Actions/MainPage';
import SearchContainer                     from './Search/SearchContainer';

class HomePage extends Component {

  render() {
    console.log("this. props is ", this.props);
    return (
      <SearchContainer/>
    )
  }
}

const mapStateToProps = (state) => {
  return {state:state};
};

const mapDispatchToProps = {
  fetch,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);