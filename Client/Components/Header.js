import React, { Component }           from 'react';
import BarCollection                         from './Header/BarCollection';
import { Consumer }                   from '../context';
import { Consumer as MainConsumer }   from '../main';
import './CSS/Header.scss';

export default class Header extends Component {
  render() {
    return (
      <div className="main-header">
        <MainConsumer>
          {mainContext => (
            <Consumer>
              {context => { return <BarCollection axios={context.axios} {...mainContext} {...this.props}/> }}
            </Consumer>
          )}
        </MainConsumer>
      </div>
    )
  }
}