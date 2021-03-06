import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import { Consumer as AxiosConsumer }                    from '../context';

import Login_Container                                  from "./Body/Account/Login_Container";
import SignUp                                           from "./Body/Account/SignUp_Container";
import CreateListingContainer                           from './Body/CarListing/CreateListingContainer';
import HomePage                                         from "./Body/HomePage/HomePage";
import Profile                                          from "./Body/Account/Profile_Container";
import UpgradeAccount                                   from "./Body/Account/UpgradeAccountContainer";
import DisplayCarListingContainer                       from "./Body/CarListing/DisplayCarListingContainer";
import ShowCarListingCollectionContainer                from "./Body/CarListing/ShowCarListingCollectionContainer";
import CreateCarContainer                               from "./Body/Car/CreateCarContainer";
import EditListingContainer                             from "./Body/CarListing/EditListingContainer";
import ReviewBookingApplicationContainer                from "./Body/CarListing/BookingRequest/ReviewBookingApplicationContainer";
import ChatContainer                                    from "./Body/Chat/ChatContainer";
import ChatHistoryContainer                             from "./Body/Chat/ChatHistoryContainer";

import './CSS/Home.scss';
import './CSS/Login.scss';
import './CSS/Footer.scss';
import './CSS/Body/CarListing/CreateListingContainer.scss';
import './CSS/Body/Chat/Chat.scss';
import './CSS/Profile.scss';
import './CSS/Body/HomePage/HomePage.scss';
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
   * @param exact
   * @param requireAuth Authentication level that is required to render the component.
   *             This is an array that contains "carOwner", "carRenter" or "admin"
   * @param rest The remaining props to be passed to the component
   * @returns {*} The route for the component to be render
   */
  privateRoute = ({ component: Component, exact, requireAuth, ...rest }) => {
    return (
      <Route
        exact={exact}
        render={(innerProps) => {
          const { auth } = this.props;
          const { loggedIn, type } = auth;
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
                    <Component {...innerProps}  {...rest} axios={context.axios} redirectAxios={context.redirectAxios} auth={auth} />
                  )
                }}
              </AxiosConsumer>
            )
            : <Redirect to={{pathname: '/login', state: {from: innerProps.location}}} />
        }}
      />
    )
  };

  publicRoute = ({ component: Component, exact, auth, ...rest }) => {
    return (
      <AxiosConsumer>
        {(context) => {
          return (
            <Route
              exact={exact}
              render={(innerProps) => {
                return <Component {...innerProps} {...rest} axios={context.axios} redirectAxios={context.redirectAxios} />
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
                  <PublicRoute exact path="/" component={HomePage} />

                  /*
                      Authentication
                   */
                  <Route path="/login" component={Login_Container} />
                  <Route path="/register" component={SignUp} />
                  <PrivateRoute path="/upgrade-account" component={UpgradeAccount} requireAuth={[ USER_TYPE.carRenter ]}/>

                  /*
                      Profile management
                   */
                  <PrivateRoute path="/profile" component={Profile} />

                  /*
                      Car listing management
                   */
                  <PublicRoute path="/display-car-listing/:carListingId" component={DisplayCarListingContainer} />

                  <PrivateRoute path="/edit-car-listing/:carListingId" component={EditListingContainer} requireAuth={[ USER_TYPE.carOwner ]} />
                  <PrivateRoute path="/create-car-listing" component={CreateListingContainer} axios={context.axios} requireAuth={[ USER_TYPE.carOwner ]} />
                  <PrivateRoute path="/create-car" component={CreateCarContainer} axios={context.axios} requireAuth={[ USER_TYPE.carOwner ]} />
                  <PrivateRoute path="/car-listings" component={ShowCarListingCollectionContainer} requireAuth={[ USER_TYPE.carOwner ]} />

                  /*
                      Review booking applications for car listings
                   */
                  <PrivateRoute path="/review-applications/:carListingId" component={ReviewBookingApplicationContainer} requireAuth={[ USER_TYPE.carOwner ]} />

                  /*
                      Message a carOwner, by selecting the owner from one of their car listing
                   */
                  <PrivateRoute exact path="/chat" component={ChatHistoryContainer} requireAuth={[ USER_TYPE.carOwner, USER_TYPE.carRenter ]} />
                  <PrivateRoute path="/chat/:recipient" component={ChatContainer} requireAuth={[ USER_TYPE.carOwner, USER_TYPE.carRenter ]} />
                </Switch>
              )
            }}
          </AxiosConsumer>
        </div>
      </div>
    )
  }
}