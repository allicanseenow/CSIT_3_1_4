import React, { Component } from 'react';
import SignupForm           from './SignUp_Component';
import { Consumer }         from '../../../context';

export default class SignupPage extends Component {
  render() {
    // const { } = this.props;
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <Consumer>
            {context => (
              <SignupForm
                axios={context.axios}
              />
            )}
          </Consumer>
        </div>
      </div>
    );
  }
}