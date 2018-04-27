import React, { Component }                                       from 'react';
import { Tabs, Tab, Image, label, Button, form , input}           from 'react-bootstrap';
import { LinkContainer }                                          from 'react-router-bootstrap';
import { Redirect }                                               from 'react-router';
import _                                                          from 'lodash';


export default class Profile_Component extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    passwordConfirmation: '',
    errors: '',
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onBlur = (event) => {
    if (_.isEmpty(event.target.value)) {
      const newErr = _.merge(this.state.errors, { [event.target.name]: 'This field is required' });
      this.setState({ errors: newErr });
      console.log('Error:',this.state.errors);
    }
    else {
      const newErr = _.merge(this.state.errors, { [event.target.name]: '' });
      this.setState({ errors: newErr });
      console.log('Error:',this.state);
    }
  };
  renderOverview = () => {
    return(

      <div className="col-xs-4 col-md-3">
      <h4>get info from api -fname, lname, DOB, Driver license</h4>
        <Image src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" rounded />
      </div>
    )
  };
  renderPaymentDetails = () => {
      return(
        <h1>renderPaymentDetails</h1>
      )
  };
  renderBillingDetails = () => {
      return(
        <h1>renderBillingDetails</h1>
      )
  };
  renderChangePassword = () => {
    const { newPassword, oldPassword, passwordConfirmation } = this.state;
      return(
        <div className="row">
          <div className="col-lg-11 col-lg-offset-1">
            <h4>Change password</h4>
          </div>

          <div className="col-sm-5 col-sm-offset-1">
            <form >
              <div className ="form-group">
                  <label >Old Password</label>
                  <input  value={oldPassword} name="oldPassword" type="password" className="form-control" onChange={this.onChange} onBlur={this.onBlur}  />
                  <label >New Password</label>
                  <input  value= {newPassword} name="newPassword" type="password" className="form-control" onChange={this.onChange} onBlur={this.onBlur} />
                  <label >Confirm Password</label>
                  <input  value={passwordConfirmation} name="passwordConfirmation" type="password" className="form-control mb-10" onChange={this.onChange} onBlur={this.onBlur} />
              </div>
                  <Button key="submitNPButton" type="button" bsSize="large" bsStyle="primary" block className="btn-signin" >Sign in</Button>
            </form>
          </div>
        </div>
      )
  };

  renderRenterProfile = () => {
    return(
      <Tabs defaultActiveKey={1}  id="Pofile">
        <Tab eventKey={1} title="Overview">
          {this.renderOverview()}
        </Tab>
        <Tab eventKey={2} title="Payment Details">
          {this.renderPaymentDetails()}
        </Tab>
        <Tab eventKey={3} title="Password">
          {this.renderChangePassword()}
        </Tab>
      </Tabs>
    )
  };
  renderOwnerProfile = () => {
    return(
      <Tabs defaultActiveKey={1}  id="Pofile">
        <Tab eventKey={1} title="Overview">
            {this.renderOverview()}
        </Tab>
        <Tab eventKey={2} title="Payment Details">
            {this.renderPaymentDetails()}
        </Tab>
        <Tab eventKey={3} title="Billing Details">
            {this.renderBillingDetails()}
        </Tab>
        <Tab eventKey={4} title="Password">
            {this.renderChangePassword()}
        </Tab>
      </Tabs>
    )
  };

  render(){

    console.log('Profile Component',this.props);

    const { name, type, loggedIn } = this.props;
    let profile = null;
    if (loggedIn) {
      switch (type) {
        case 'carRenter':
            profile = this.renderRenterProfile();
          break;
          case 'carOwner':
            profile = this.renderOwnerProfile();
            break;
          case 'admin':
            profile = this.renderOwnerProfile();
            break;
      }
      return(
        <div className="container">
          {profile}
        </div>
      )
    }
    else {
      return <Redirect to="/login"/>
    }
  }
}
