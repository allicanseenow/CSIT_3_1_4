import axios                    from 'axios';
import React, { Component }     from 'react';
import PropTypes                from 'prop-types';
import _                        from 'lodash';
import classnames               from 'classnames';
import { Grid, Row, Col, Button, FormGroup }            from 'react-bootstrap';
import TextFieldGroup           from '../../Utility/TextFieldGroup';
import { validateRegister }        from '../../Utility/Validator';

import SteppingDot              from '../../RecyclableComponents/SteppingDot';

export default class Signup_Component extends Component {
  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired
  };

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

  onSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      let token
      if (typeof document !== 'undefined' && document.querySelector('meta[name="csrf-token"]')) token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

      const defaultHeaders = {
        'x-csrf-token': token,
      }
      this.setState({ errors: {}, isLoading: true });

    }
    console.log('submit')
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
    console.log('page is ', page)
    const { errors, isValid } = validateRegister(this.state, page);
    if (!isValid) {
      this.setState({ errors });
    }
    console.log('isvalid id ', isValid)
    return isValid;
  };

  checkUserExists = (event) => {
    const field = event.target.name;
    const val = event.target.value;
    // if (val !== '') {
    //   this.props.isUserExists(val).then(res => {
    //
    //   })
    // }
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
          console.log('render stepping dot ', index);
          return <SteppingDot key={`steppingDot-${index}`} borderRadius="35%" step={index} clicked={clicked} onClick={this.clickTickBox} />
        }) }
      </FormGroup>
    )
  };

  renderTextFieldGroup = (field, value, label, onChange, error, placeholder, type) => {
    return (
      <TextFieldGroup key={`TextFieldGroup-${field}`} field={field} value={value} label={label} onChange={onChange} error={error} type={type} placeholder={placeholder}/>
    )
  };

  renderStep = (step) => {
    const { username, errors, email, password, cardHolderName, cardNumber, cardExpiryDate, passwordConfirmation, firstName, lastName, licenseNumber, dob } = this.state;
    const formBody = [
      (<div>
        { this.renderTextFieldGroup("username", username, "Username", this.onChange, errors.username) }
        { this.renderTextFieldGroup("email", email, "Email", this.onChange, errors.email) }
        { this.renderTextFieldGroup("password", password, "Password", this.onChange, errors.password, null, "password") }
        { this.renderTextFieldGroup("passwordConfirmation", passwordConfirmation, "Password Confirmation", this.onChange, errors.passwordConfirmation, null, "password") }
      </div>),
      (<div>
        { this.renderTextFieldGroup("firstName", firstName, "First Name", this.onChange, errors.firstName) }
        { this.renderTextFieldGroup("lastName", lastName, "Last Name", this.onChange, errors.lastName) }
        { this.renderTextFieldGroup("dob", dob, "Date of Birth", this.onChange, errors.dob, "DD-MM-YY") }
        { this.renderTextFieldGroup("licenseNumber", licenseNumber, "Driver license Number", this.onChange, errors.licenseNumber) }
        <Grid className="bankDetail-wrapper" fluid>
          <Row>
            <Col md={8} sm={12}>
              { this.renderTextFieldGroup("cardNumber", cardNumber, "Card Number", this.onChange, errors.cardNumber) }
            </Col>
            <Col md={4} sm={12}>
              { this.renderTextFieldGroup("cardExpiryDate", cardExpiryDate, "Expiry Date", this.onChange, errors.cardExpiryDate, "MM-YYYY") }
            </Col>
          </Row>
          <Row>
            <Col sm={12}>{ this.renderTextFieldGroup("cardHolderName", cardHolderName, "Name on the credit card", this.onChange, errors.cardHolderName) }</Col>
          </Row>
        </Grid>
      </div>),
      <div>

      </div>
    ][step];
    console.log('step button', step)
    const formButton = [
      (<div>
        <Button key="nextButton" bsStyle="primary" onClick={this.onClickNextStep} disabled={this.state.isLoading || this.state.invalid}>Next</Button>
      </div>),
      (<div>
        <Button key="submitButton" bsStyle="primary" type="submit" disabled={this.state.isLoading || this.state.invalid}>Sign up</Button>
      </div>)
    ][step];
    console.log('after step')

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
    axios.get('http://localhost:9000/api/v2/disciplines', {
      // headers: {
      //   "Access-Control-Allow-Origin": "https://1scope.com",
      //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      //   "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      // },
      // proxy: {
      //   host: '127.0.0.1',
      //   port: 9001,
      // },
      // withCredentials: true
    }).then((res) => {
      console.log('axios reposnse', res);
    })
      .catch(err => {
        console.log('err is ', err);
      })
  }



  render(){
    const { errors, step } = this.state;
    return (
      <div className="card card-container">
        <form onSubmit={this.onSubmit}>
          <h1>Join the platform</h1>
          { this.renderStep(step) }
        </form>
      </div>
    )
  }
}