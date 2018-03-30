import axios                    from 'axios';
import React, { Component }     from 'react';
import PropTypes                from 'prop-types';
import _                        from 'lodash';
import classnames               from 'classnames';
import TextFieldGroup           from '../Utility/TextFieldGroup';
import validateInput           from '../Utility/Validator';

export default class Signup_Component extends Component {
  propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired
  };

  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {},
    isLoading: false,
    invalid: false
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isValid = () => {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
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
  };

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
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join the platform</h1>
        <TextFieldGroup
          field="username"
          value={this.state.username}
          label="Username"
          onChange={this.onChange}
          error={errors.username}
        />
        <TextFieldGroup
          field="email"
          value={this.state.email}
          label="Email"
          onChange={this.onChange}
          error={errors.email}
        />
        <TextFieldGroup
          field="password"
          value={this.state.password}
          label="Password"
          onChange={this.onChange}
          type="password"
          error={errors.password}
        />
        <TextFieldGroup
          field="passwordConfirmation"
          value={this.state.passwordConfirmation}
          label="Password Confirmation"
          onChange={this.onChange}
          type="password"
          error={errors.passwordConfirmation}
        />
        <div className="form-group">
          <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
    )
  }
}