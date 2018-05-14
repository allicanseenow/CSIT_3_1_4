import React, { Component }                 from 'react';
import { connect }                          from 'react-redux';
import _                                    from 'lodash';
import SearchComponent                      from './SearchComponent';
import {fetchCarListing}                    from "../../../../Actions/MainPage";

class SearchContainer extends Component {
  render() {
    const { carListing } = this.props;
    console.log('thisprops here i -s ', this.props);
    return (
      <SearchComponent
        carListing={carListing}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return { carListing: state && state.mainPage && state.mainPage.listing };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);