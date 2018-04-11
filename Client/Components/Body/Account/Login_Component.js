import React, { Component }                                       from 'react';
import { Button, Image, Label }                                   from 'react-bootstrap';
import { validateLoginForm }                                      from '../../Utility/Validator';
// import axios  from'axios';

export default class Login_Component extends Component {
  state = {
    username: '',
    password: '',
    rememberMe: false,
    error: '',
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
    console.log('this props while submitting ', this.props);
    const { axios } = this.props;
    if (validateLoginForm(this.state)) {
      axios().post('http://localhost:9000/api/auth', { username, password })
      .then((res) => {
        console.log('response in Login is ', res);
        window.localStorage.localToken = res.data.token;
        window.location = "/";
      })
      .catch((err) => {
        console.log('Error while logging in', err);
        this.setState({ error: err })
      });
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
    console.log('this props is ', this.props)
    return (
      <div className="container">
        <div className="card card-container">
          <Image id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
          <p id="profile-name" className="profile-name-card"/>
          { this.renderMainForm() }
        </div>
      </div>
    )
  }
}