import React, { Component }                 from 'react';
import { connect }                          from 'react-redux';
import { fetch }                            from '../../Actions/MainPage';

import                                      '../CSS/NavBar/SearchBar.scss';

class SearchBar extends Component {
  render() {
    console.log("this props inside SearchBar", this.props);
    this.props.fetch();
    return (
      <div className="search-bar">
        <ul>
          <li>
            <a>Date</a>
          </li>
          <li>
            <a>Passenger</a>
          </li>
          <li>
            <a>Type</a>
          </li>
          <li>
            <a>Cost</a>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { state: state };
};

const mapDispatchToProps = {
  fetch,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);