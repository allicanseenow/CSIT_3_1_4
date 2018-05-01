import React, { Component }                                       from 'react';
import { Tabs, Tab, Image, label, Button, form , input}           from 'react-bootstrap';
import { LinkContainer }                                          from 'react-router-bootstrap';
import { Redirect }                                               from 'react-router';
import _                                                          from 'lodash';
import { validateChangePassword }                                 from '../../Utility/Validator';
import TextFieldGroup                                             from '../../Utility/TextFieldGroup';
import axios                                                      from 'axios'
import ErrorNotificationBox                                       from '../../RecyclableComponents/ErrorNotificationBox';
import ConfirmationNotificationBox                                from '../../RecyclableComponents/ConfirmationNotificationBox';

export default class Profile_Component extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    passwordConfirmation: '',

    errors: {},
    submitError: null,
    submitConfirm: null
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onBlur = (event) => {
    if (_.isEmpty(event.target.value)) {
      const newErr = _.merge(this.state.errors, { [event.target.name]: 'This field is required' });
      this.setState({ errors: newErr });
    }
    else {
      const newErr = _.merge(this.state.errors, { [event.target.name]: '' });
      this.setState({ errors: newErr });
    }
  };

  isValid = (page) => {
    const { errors, isValid } = validateChangePassword(this.state, page);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;

  };
  onSubmitChangePaymentDetail = (event) => {

  }

  onSubmitChangePassword = (event) => {
	event.preventDefault();
    if (this.isValid()){
      const {oldPassword, newPassword} = this.state;
      console.log("submitChangePassword");
      axios({
        method: 'put',
        url: 'http://localhost:9000/api/account',
        data: {
          oldPassword: oldPassword,
          password: newPassword
        },
        headers: {'x-access-token': window.localStorage.localToken}
      })
      .then((res) => {
        this.setState({ submitError: null });
        this.setState({ submitConfirm: "Successfully changed password" });
      })
      .catch(({ response }) => {
        const errorMsg = response && response.data && response.data.message;
        this.setState({ submitConfirm: null});
        this.setState({ submitError: errorMsg }, () => {
          window.scrollTo(0, 0);
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
    }
  };


  renderTextFieldGroup = (field, value, label, onChange, onBlur, error, placeholder, type) => {
    return (
      <TextFieldGroup key={`TextFieldGroup-${field}`} field={field} value={value} label={label} onChange={onChange} onBlur={onBlur} error={error} type={type} placeholder={placeholder}/>
    )
  };



  renderOverview = () => {
    return(

      <div className="col-xs-4 col-md-3">
      <h4>get info from api -fname, lname, DOB</h4>
        <Image src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" rounded />
      </div>
    )
  };
  renderPaymentDetails = () => {
    const {} = this.state;
      return(
        <div>
        <h1>renderPaymentDetails</h1>
          <div className="row">
            <div className="col-sm-5 col-sm-offset-1">
              <form onSubmit={this.onSubmitChangePaymentDetail} >
                <div className ="form-group">
                </div>
              </form>

            </div>
          </div>
        </div>
      )
  };
  renderBillingDetails = () => {
      return(
        <h1>renderBillingDetails</h1>
      )
  };
  renderChangePassword = () => {
    const { newPassword, oldPassword, passwordConfirmation, errors, submitError, submitConfirm } = this.state;
      return(
        <div className="row">

          <div className="col-sm-5 col-sm-offset-1">
            <form onSubmit={this.onSubmitChangePassword} >
              { submitError && (
                <div className="error-form-singup">
                  <ErrorNotificationBox>
                    {submitError}
                  </ErrorNotificationBox>
                </div>
              ) }
              { submitConfirm && (
                <div className="confirm-form-singup">
                  <ConfirmationNotificationBox>
                    {submitConfirm}
                  </ConfirmationNotificationBox>
                </div>
              ) }
              <h4>Change password</h4>
              <div className ="form-group">
                {this.renderTextFieldGroup("oldPassword", oldPassword, "Old password", this.onChange, this.onBlur, errors.oldPassword, null, "password")}
                {this.renderTextFieldGroup("newPassword", newPassword, "New password", this.onChange, this.onBlur, errors.newPassword, null, "password")}
                {this.renderTextFieldGroup("passwordConfirmation", passwordConfirmation, "Confirm password", this.onChange, this.onBlur, errors.passwordConfirmation, null, "password")}
              </div>
                  <Button key="submitNPButton" type="submit" bsSize="large" bsStyle="primary" block className="btn-signin" >Change Password</Button>
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

    const { username, type, loggedIn } = this.props;
    this.username = username;
    console.log("username main", this.username);
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
