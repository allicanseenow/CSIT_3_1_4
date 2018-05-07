import React, { Component }                                       from 'react';
import { Tabs, Tab, Image, label, Button, form , input}           from 'react-bootstrap';
import { LinkContainer }                                          from 'react-router-bootstrap';
import { Redirect }                                               from 'react-router';
import _                                                          from 'lodash';
import { validateChangePassword,validateChangePaymentDetail, validateChangeBillingDetail }    from '../../Utility/Validator';
import TextFieldGroup                                             from '../../Utility/TextFieldGroup';
import axios                                                      from 'axios'
import ErrorNotificationBox                                       from '../../RecyclableComponents/ErrorNotificationBox';
import ConfirmationNotificationBox                                from '../../RecyclableComponents/ConfirmationNotificationBox';

export default class Profile_Component extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    passwordConfirmation: '',

    cardHolderName: '',
    cardNumber: '',
    cardExpiryDate: '',
    cardCvv: '',

    accountName: '',
    bsb: '',
    accountNumber: '',

    errors: {},
    submitPayError: null,
    submitBillError: null,
    submitPassError: null,
    submitPayConfirm: null,
    submitBillConfirm: null,
    submitPassConfirm: null,
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

  isValid = (tab) => {
    const errors = null;
    const isValid = true;
    if(tab == 2){
      const { errors, isValid }  = validateChangePaymentDetail(this.state);
    }
    else if(tab == 3){
      const { errors, isValid } = validateChangeBillingDetail(this.state);
    }
    else if(tab == 4){
      const { errors, isValid } = validateChangePassword(this.state);
    }
    else{
      const {errors, isValid } = validateChangePassword(this.state);
    }

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;

  };
  onSubmitChangePaymentDetail = (event) => {
    event.preventDefault();

    if (this.isValid(2)){
      const {cardHolderName, cardNumber, cardExpiryDate, cardCvv} = this.state;
      console.log("submitChangePassword");
      axios({
        method: 'put',
        url: 'http://localhost:9000/api/account',
        data: {
          creditCard:{
            cardholder: cardHolderName,
            cardNumber: cardNumber,
            cardCvv: cardCvv,
            expiryDate: cardExpiryDate
          }
        },
        headers: {'x-access-token': window.localStorage.localToken}
      })
      .then((res) => {
        console.log("payment res", res);
        this.setState({ submitPayError: null });
        this.setState({ submitPayConfirm: "Successfully changed payment detail" });
      })
      .catch(({ response }) => {
        console.log("payment error", response);
        const errorMsg = response && response.data && response.data.message;
        this.setState({ submitPayConfirm: null});
        this.setState({ submitPayError: errorMsg }, () => {
          window.scrollTo(0, 0);
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
    }

  };

  onSubmitChangeBillingDetail = (event) => {
	event.preventDefault();
    if (this.isValid(3)){
      const {accountNumber, bsb} = this.state;
      axios({
        method: 'put',
        url: 'http://localhost:9000/api/account',
        data: {
          bsb: bsb,
          accountNumber: accountNumber,
        },
        headers: {'x-access-token': window.localStorage.localToken}
      })
      .then((res) => {
        this.setState({ submitBillError: null });
        this.setState({ submitBillConfirm: "Successfully changed billing details" });
        console.log("billing res", res);
      })
      .catch(({ response }) => {
        console.log("error response", response);
        const errorMsg = response && response.data && response.data.message;
        this.setState({ submitBillConfirm: null});
        this.setState({ submitBillError: errorMsg }, () => {
          window.scrollTo(0, 0);
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
    }
  };

  onSubmitChangePassword = (event) => {
	event.preventDefault();
    if (this.isValid(4)){
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
        this.setState({ submitPassError: null });
        this.setState({ submitPassConfirm: "Successfully changed password" });
      })
      .catch(({ response }) => {
        const errorMsg = response && response.data && response.data.message;
        this.setState({ submitPassConfirm: null});
        this.setState({ submitPassError: errorMsg }, () => {
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
    const {cardHolderName, cardNumber, cardExpiryDate, cardCvv, submitPayError, submitPayConfirm, errors} = this.state;
      return(
        <div className="row">
          <div className="col-sm-6 col-sm-offset-1">
            <form onSubmit={this.onSubmitChangePaymentDetail} >
              { submitPayError && (
                <div className="error-form-singup">
                  <ErrorNotificationBox>
                    {submitPayError}
                  </ErrorNotificationBox>
                </div>
              ) }
              { submitPayConfirm && (
                <div className="confirm-form-singup">
                  <ConfirmationNotificationBox>
                    {submitPayConfirm}
                  </ConfirmationNotificationBox>
                </div>
              ) }
              <h3>Change payment details</h3>
              <div className ="form-group">
                <div className="row">
                  <div className="col-sm-12">
                    {this.renderTextFieldGroup("cardHolderName", cardHolderName, "Name on the credit card", this.onChange, this.onBlur, errors.cardHolderName) }
                    {this.renderTextFieldGroup("cardNumber", cardNumber, "Card Number", this.onChange, this.onBlur, errors.cardNumber) }
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    { this.renderTextFieldGroup("cardExpiryDate", cardExpiryDate, "Expiry Date", this.onChange, this.onBlur, errors.cardExpiryDate, "DD-MM-YYYY") }
                  </div>
                  <div className="col-sm-12 col-md-6">
                    { this.renderTextFieldGroup("cardCvv", cardCvv, "CVV", this.onChange, this.onBlur, errors.cardCvv, "CVV") }
                  </div>
                </div>
              </div>
                  <Button key="submitNPButton" type="submit" bsSize="large" bsStyle="primary" block className="btn-signin" >Change payment detail</Button>
            </form>
          </div>
        </div>
      )
  };
  renderBillingDetails = () => {
      const {accountHolder, bsb, accountNumber, submitBillError, submitBillConfirm, errors} = this.state;
      return(
        <div className="row row-profile">
          <div className="col-sm-6 col-sm-offset-1">
            <form onSubmit={this.onSubmitChangeBillingDetail} >
              { submitBillError && (
                <div className="error-form-singup">
                  <ErrorNotificationBox>
                    {submitBillError}
                  </ErrorNotificationBox>
                </div>
              ) }
              { submitBillConfirm && (
                <div className="confirm-form-singup">
                  <ConfirmationNotificationBox>
                    {submitBillConfirm}
                  </ConfirmationNotificationBox>
                </div>
              ) }
              <h3>Change billing details</h3>
              <div className ="form-group">
                <div className="row">
                  <div className="col-sm-12">
                    {this.renderTextFieldGroup("accountHolder", accountHolder, "Name of account holder", this.onChange, this.onBlur, errors.accountName) }
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-5">
                    { this.renderTextFieldGroup("bsb", bsb, "BSB", this.onChange, this.onBlur, errors.bsb, "BSB") }
                  </div>
                  <div className="col-sm-12 col-md-7">
                    { this.renderTextFieldGroup("accountNumber", accountNumber, "Account Number", this.onChange, this.onBlur, errors.accountNumber, "Account no") }
                  </div>
                </div>
              </div>
                  <Button key="submitNPButton" type="submit" bsSize="large" bsStyle="primary" block className="btn-signin" >Change billing detail</Button>
            </form>
          </div>
        </div>

      )
  };
  renderChangePassword = () => {
    const { newPassword, oldPassword, passwordConfirmation, errors, submitPassError, submitPassConfirm } = this.state;
      return(
        <div className="row">

          <div className="col-sm-5 col-sm-offset-1">
            <form onSubmit={this.onSubmitChangePassword} >
              { submitPassError && (
                <div className="error-form-singup">
                  <ErrorNotificationBox>
                    {submitPassError}
                  </ErrorNotificationBox>
                </div>
              ) }
              { submitPassConfirm && (
                <div className="confirm-form-singup">
                  <ConfirmationNotificationBox>
                    {submitPassConfirm}
                  </ConfirmationNotificationBox>
                </div>
              ) }
              <h3>Change password</h3>
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
        <Tab eventKey={2} title="Payment Details" >
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