import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import { Consumer as AxiosConsumer }                    from '../context';

import Login_Container                                  from "./Body/Account/Login_Container";
import SignUp                                           from "./Body/Account/SignUp_Container";
import CreateListingContainer                           from './Body/CarListing/CreateListingContainer';
import HomePage                                         from "./Body/HomePage/HomePage";
import Profile                                          from "./Body/Account/Profile_Container";
import DisplayCarListingContainer                       from "./Body/CarListing/DisplayCarListingContainer";
import ShowCarListingCollectionContainer                from "./Body/CarListing/ShowCarListingCollectionContainer";
import CreateCarContainer                               from "./Body/Car/CreateCarContainer";

import './CSS/Home.scss';
import './CSS/Login.scss';
import './CSS/Footer.scss';
import './CSS/Body/CarListing/CreateListingContainer.scss';
import './CSS/Profile.scss';
import './CSS/RecyclableComponents/SteppingDot.scss';

const USER_TYPE = {
  carOwner: 'carOwner',
  carRenter: 'carRenter',
  admin: 'admin',
};

export default class Home extends Component {
  /**
   * Private routing for rendering components that require authentication
   * @param Component The component to be rendered
   * @param requireAuth Authentication level that is required to render the component.
   *             This is an array that contains "carOwner", "carRenter" or "admin"
   * @param rest The remaining props to be passed to the component
   * @returns {*} The route for the component to be render
   */
  privateRoute = ({ component: Component, requireAuth, ...rest }) => {
    return (
      <Route
        render={(innerProps) => {
          const { loggedIn, type } = this.props.auth;
          // If user is logged in but doesn't have the right auth level, access to the page is rejected
          if (loggedIn && requireAuth && !requireAuth.includes(type)) {
            return (
              <div>Unauthorized</div>
            );
          }
          // If the user is logged in and we have reached where this condition is checked, this means the user
          // has the right auth level
          const authed = loggedIn;
          return authed
            ? (
              <AxiosConsumer>
                {(context) => {
                  return (
                    <Component {...innerProps}  {...rest} axios={context.axios}/>
                  )
                }}
              </AxiosConsumer>
            )
            : <Redirect to={{pathname: '/login', state: {from: innerProps.location}}} />
        }}
      />
    )
  };

  publicRoute = ({ component: Component, auth, ...rest }) => {
    return (
      <AxiosConsumer>
        {(context) => {
          return (
            <Route
              render={(innerProps) => {
                return <Component {...innerProps} {...rest} axios={context.axios}/>
              }}
            />
          )
        }}
      </AxiosConsumer>
    )
  };

  render() {
    const PrivateRoute = this.privateRoute;
    const PublicRoute = this.publicRoute;
    return (
      <div className="main-body">
        <div className="container-fluid inner-margin">
          <AxiosConsumer>
            {(context) => {
              return (
                <Switch>
                  <Route exact path="/" component={HomePage} />

                  /*
                      Authentication
                   */
                  <Route path="/login" component={Login_Container} />
                  <Route path="/register" component={SignUp} />

                  /*
                      Profile management
                   */
                  <PrivateRoute path="/profile" component={Profile} />

                  /*
                      Car listing management
                   */
                  <PublicRoute path="/display-car-listing/:carListingId" component={DisplayCarListingContainer} />

                  <PrivateRoute path="/create-car-listing" component={CreateListingContainer} axios={context.axios} requireAuth={[ USER_TYPE.carOwner ]} />
                  <PrivateRoute path="/create-car" component={CreateCarContainer} axios={context.axios} requireAuth={[ USER_TYPE.carOwner ]} />
                  <PrivateRoute path="/car-listings" component={ShowCarListingCollectionContainer} requireAuth={[ USER_TYPE.carOwner ]} />
                </Switch>
              )
            }}
          </AxiosConsumer>
        </div>
      </div>
    )
  }
}