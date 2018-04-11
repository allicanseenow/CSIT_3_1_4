import React, { Component }                                       from 'react';
import LoginFormm                                                 from './Login_Component';
import { Consumer }                                               from '../../../context';
import { Consumer as MainConsumer }                               from '../../../main';

export default class Login_Container extends Component {
  render() {
    console.log('THis props inside login is ', this.props);
    return (
      <MainConsumer>
        {mainContext => (
          <Consumer>
            { context => <LoginFormm axios={context.axios} {...mainContext} {...this.props}/>}
          </Consumer>
        )}
      </MainConsumer>
    )
  }
}