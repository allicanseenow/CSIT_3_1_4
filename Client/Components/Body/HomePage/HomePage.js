import React, { Component, createContext } from 'react';
import { connect }                         from 'react-redux';
import { fetch }                           from '../../../Actions/MainPage';
// import { Provider } from '../../../main';

class HomePage extends Component {
  updateBody = () => {

  };

  render() {
    console.log("this. props is ", this.props);
    return (
      <div>

      </div>
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