import React, { Component }                                       from 'react';
import { Button, Image, Label }                                   from 'react-bootstrap';
import { validateLoginForm }                                      from '../../Utility/Validator';
import ErrorNotificationBox                                       from '../../RecyclableComponents/ErrorNotificationBox';
// import axios  from'axios';

export default class Login_Component extends Component {
  state = {
    username: '',
    password: '',
    rememberMe: false,
    error: '',
    submitting: false,
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckBox = (event) => {
    this.setState({  [event.target.name]: event.target.checked });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { username, password, rememberMe } = this.state;
    const { history, setLoginStatus } = this.props;
    const { axios } = this.props;
    if (validateLoginForm(this.state)) {
      this.setState({ submitting: true }, () => {
        axios().post('http://localhost:9000/api/auth', { username, password })
          .then((res) => {
            this.setState({ error: null }, () => {
              window.localStorage.localToken = res.data.token;
              if (this.props.location.state && this.props.location.state.from.pathname) {
                return window.location = this.props.location.state.from.pathname;
              }
              return window.location = "/";
            });
          })
          .catch(({ response }) => {
            const errorMsg = response && response.data && response.data.message;
            this.setState({ error: errorMsg }, () => window.scrollTo(0, 0));
          })
          .finally(() => {
            this.setState({ submitting: false });
          });
      });
    }
    else {
      this.setState({ error: 'Password needs to have at least 8 characters'});
    }
  };

  renderMainForm = () => {
    const { username, password, rememberMe } = this.state;
    return (
      <div key="MainForm">
        <form className="form-signin" onSubmit={this.onSubmit}>
          <span id="reauth-email" className="reauth-email"/>
          <input value={username} name="username" onChange={this.onChange} className="form-control" placeholder="Username" required autoFocus />
          <input value={password} onChange={this.onChange} name="password" type="password" className="form-control" placeholder="Password" required />
          <div id="remember" className="checkbox">
            <label>
              <input name="rememberMe" checked={rememberMe} onChange={this.onChangeCheckBox} type="checkbox" value="remember-me" /> <span>Remember me</span>
            </label>
          </div>
          {/*<button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>*/}
          <Button key="submitButton" type="submit" bsSize="large" bsStyle="primary" block className="btn-signin">Sign in</Button>
        </form>
        <a href="#" className="forgot-password">
          Forgot the password?
        </a>
      </div>
    )
  };

  render() {
    const { error } = this.state;
    return (
      <div className="container">
        <div className="card card-container">
          { error && (
            <div className="error-form-singup">
              <ErrorNotificationBox>
                {error}
              </ErrorNotificationBox>
            </div>
          ) }
          <Image id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
          <p id="profile-name" className="profile-name-card"/>
          { this.renderMainForm() }
        </div>
      </div>
    )
  }
}
