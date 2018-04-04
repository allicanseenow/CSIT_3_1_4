import React, { Component }                                       from 'react';
import { Button, Image, Label }                                                 from 'react-bootstrap';

export default class Login_Component extends Component {
  render() {
    return (
      <div className="container">
        <div className="card card-container">
          <Image id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
          <p id="profile-name" className="profile-name-card"></p>
          <form className="form-signin">
            <span id="reauth-email" className="reauth-email"></span>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
              <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                <div id="remember" className="checkbox">
                  <Label>
                    <input type="checkbox" value="remember-me" /> <span>Remember me</span>
                  </Label>
                </div>
                {/*<button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>*/}
            <Button type="submit" bsSize="large" bsStyle="primary" block className="btn-signin">Sign in</Button>
          </form>
          <a href="#" className="forgot-password">
            Forgot the password?
          </a>
        </div>
      </div>
    )
  }
}