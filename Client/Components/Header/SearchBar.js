import React, { Component }                from 'react';
import { connect }                         from 'react-redux';
import { fetch }                           from '../../Actions/MainPage';

class SearchBar extends Component {

  render() {
    console.log("this props inside SearchBar", this.props);
    this.props.fetch();
    return (
      <div className="second-bar">

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