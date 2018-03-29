import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Account/Login";
import SignUp from "./Account/SignUp_Container";

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <Route path="/login" component={Login} />
        <Route path="/register" component={SignUp} />
      </div>
    )
  }
}