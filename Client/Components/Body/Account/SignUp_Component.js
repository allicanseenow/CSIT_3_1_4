import React, { Component }                             from 'react';
import _                                                from 'lodash';
import { Grid, Row, Col, Button, FormGroup }            from 'react-bootstrap';
import TextFieldGroup                                   from '../../Utility/TextFieldGroup';
import ErrorNotificationBox                             from '../../RecyclableComponents/ErrorNotificationBox';
import { validateRegister }                             from '../../Utility/Validator';

import SteppingDot                                      from '../../RecyclableComponents/SteppingDot';

export default class Signup_Component extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    firstName: '',
    lastName: '',
    licenseNumber: '',
    dob: '',
    cardHolderName: '',
    cardNumber: '',
    cardExpiryDate: '',

    errors: {},
    submitError: null,
    isLoading: false,
    invalid: false,
    step: 0,
    maxStep: 0,
  };

  /**
   * Render submit logic----------------------------------------------------------------------------------------
   * @param event
   */

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

  onSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      const { username, password, firstName, lastName, dob, licenseNumber, cardHolderName, cardNumber, cardExpiryDate } = this.state;
      this.setState({ errors: {}, isLoading: true }, () => {
        this.props.axios().post('http://localhost:9000/api/account', {
          username: username,
          password: password,
          driverLicense: licenseNumber,
          firstname: firstName,
          lastname: lastName,
          dob: dob,
          creditCard: {
            cardholder: cardHolderName,
            cardNumber,
            expiryDate: cardExpiryDate
          },
        })
        .then((res) => {
          this.setState({ submitError: null });
          window.localStorage.localToken = res.data.token;
          window.location = "/";
        })
        .catch(({ response }) => {
          const errorMsg = response && response.data && response.data.message;
          this.setState({ submitError: errorMsg }, () => {
            window.scrollTo(0, 0);
          });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
      });
    }
  };

  onClickNextStep = () => {
    const { step, maxStep } = this.state;
    if (this.isValid(step)) {
      const nextStep = step + 1;
      this.setState({ step: nextStep, maxStep: maxStep < nextStep ? nextStep : maxStep });
    }
  };

  clickTickBox = (newStep) => {
    const { maxStep, step } = this.state;
    if (newStep <= maxStep && this.isValid(step)) this.setState({ step: newStep });
  };

  isValid = (page) => {
    const { errors, isValid } = validateRegister(this.state, page);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };

  /**
   *  Render components ------------------------------------------------------------------------------------
   * */

  renderStepBox = () => {
    const { step } = this.state;
    let clickedList = new Array(2);
    for (let i = 0; i < clickedList.length; ++i) {
      clickedList[i] = step === i;
    }
    return (
      <FormGroup>
        { _.map(clickedList, (clicked, index) => {
          return <SteppingDot key={`steppingDot-${index}`} borderRadius="35%" step={index} clicked={clicked} onClick={this.clickTickBox} />
        }) }
      </FormGroup>
    )
  };

  renderTextFieldGroup = (field, value, label, onChange, onBlur, error, placeholder, type) => {
    return (
      <TextFieldGroup key={`TextFieldGroup-${field}`} field={field} value={value} label={label} onChange={onChange} onBlur={onBlur} error={error} type={type} placeholder={placeholder}/>
    )
  };

  renderStep = (step) => {
    const { username, errors, email, password, cardHolderName, cardNumber, cardExpiryDate, passwordConfirmation, firstName, lastName, licenseNumber, dob } = this.state;
    const formBody = [
      (<div>
        { this.renderTextFieldGroup("username", username, "Username", this.onChange, this.onBlur, errors.username) }
        { this.renderTextFieldGroup("email", email, "Email", this.onChange, this.onBlur, errors.email) }
        { this.renderTextFieldGroup("password", password, "Password", this.onChange, this.onBlur, errors.password, null, "password") }
        { this.renderTextFieldGroup("passwordConfirmation", passwordConfirmation, "Password Confirmation", this.onChange, this.onBlur, errors.passwordConfirmation, null, "password") }
      </div>),
      (<div>
        { this.renderTextFieldGroup("firstName", firstName, "First Name", this.onChange, this.onBlur, errors.firstName) }
        { this.renderTextFieldGroup("lastName", lastName, "Last Name", this.onChange, this.onBlur, errors.lastName) }
        { this.renderTextFieldGroup("dob", dob, "Date of Birth", this.onChange, this.onBlur, errors.dob, "DD-MM-YYYY") }
        { this.renderTextFieldGroup("licenseNumber", licenseNumber, "Driver license Number", this.onChange, this.onBlur, errors.licenseNumber) }
        <Grid className="bankDetail-wrapper" fluid>
          <Row>
            <Col md={8} sm={12}>
              { this.renderTextFieldGroup("cardNumber", cardNumber, "Card Number", this.onChange, this.onBlur, errors.cardNumber) }
            </Col>
            <Col md={4} sm={12}>
              { this.renderTextFieldGroup("cardExpiryDate", cardExpiryDate, "Expiry Date", this.onChange, this.onBlur, errors.cardExpiryDate, "MM-YYYY") }
            </Col>
          </Row>
          <Row>
            <Col sm={12}>{ this.renderTextFieldGroup("cardHolderName", cardHolderName, "Name on the credit card", this.onChange, this.onBlur, errors.cardHolderName) }</Col>
          </Row>
        </Grid>
      </div>),
      <div>

      </div>
    ][step];
    const formButton = [
      (<div>
        <Button key="nextButton" bsStyle="primary" onClick={this.onClickNextStep} disabled={this.state.isLoading || this.state.invalid}>Next</Button>
      </div>),
      (<div>
        <Button key="submitButton" bsStyle="primary" type="submit" disabled={this.state.isLoading || this.state.invalid}>Sign up</Button>
      </div>)
    ][step];

    return (
      <FormGroup key="formGroupBody">
        { formBody }
        { this.renderStepBox() }
        <div className="form-group">
          { formButton }
        </div>
      </FormGroup>
    );
  };

  /**
   * Main functions------------------------------------------------------------
   */

  componentDidMount() {

  }

  render(){
    const { step, submitError } = this.state;
    return (
      <div className="card card-container">
        <form onSubmit={this.onSubmit}>
          { submitError && (
            <div className="error-form-singup">
              <ErrorNotificationBox>
                {submitError}
              </ErrorNotificationBox>
            </div>
          ) }
          <h1>Join the platform</h1>
          { this.renderStep(step) }
        </form>
      </div>
    )
  }
}
