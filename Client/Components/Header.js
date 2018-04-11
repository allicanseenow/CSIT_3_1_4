import React, { Component }           from 'react';
import NavBar                         from './Header/NavBar';
import { Consumer }                   from '../context';
import { Consumer as MainConsumer }   from '../main';
import './CSS/Header.scss';

export default class Header extends Component {
  render() {
    console.log('render header', this.props)
    return (
      <div className="main-header">
        <MainConsumer>
          {mainContext => (
            <Consumer>
              {context => { return <NavBar axios={context.axios} {...mainContext} {...this.props}/> }}
            </Consumer>
          )}
        </MainConsumer>
      </div>
    )
  }
}