import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import { Consumer as AxiosConsumer }                    from '../context';

import Login_Container                                  from "./Body/Account/Login_Container";
import SignUp                                           from "./Body/Account/SignUp_Container";
import CreateListingContainer                           from './Body/CarListing/CreateListingContainer';
import HomePage                                         from "./Body/HomePage/HomePage";

import './CSS/Home.scss';
import './CSS/Login.scss';
import './CSS/Footer.scss';
import './CSS/Body/CarListing/CreateListingContainer.scss';
import './CSS/RecyclableComponents/SteppingDot.scss';



export default class Home extends Component {
  privateRoute = ({ component: Component, auth, ...rest }) => {
    return (
      <Route
        render={(innerProps) => {
          const { loggedIn } = this.props.auth;
          const authed = loggedIn;
          return authed
            ? <Component {...innerProps}  {...rest} />
            : <Redirect to={{pathname: '/login', state: {from: innerProps.location}}} />
        }}
      />
    )
  };

  render() {
    const PrivateRoute = this.privateRoute;
    return (
      <div className="main-body">
        <div className="container-fluid inner-margin">
          <AxiosConsumer>
            {(context) => {
              return (
                <Switch>
                  <Route exact path="/" component={HomePage} />

                  <Route path="/login" component={Login_Container} />
                  <Route path="/register" component={SignUp} />

                  <PrivateRoute path="/create-car-listing" component={CreateListingContainer} axios={context.axios}/>
                </Switch>
              )
            }}
          </AxiosConsumer>
        </div>
      </div>
    )
  }
}