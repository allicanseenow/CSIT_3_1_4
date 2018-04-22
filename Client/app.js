import React, { Component, createContext }    from 'react';
import createHistory                          from "history/createBrowserHistory"
import { render }                             from 'react-dom';
import { Router, Switch, Route, Link }        from "react-router-dom";
import { Provider }                           from 'react-redux';
import configureStore                         from './Store/configureStore';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import Main from './main';
import { Consumer } from './context';
const history = createHistory();

import './app.scss';
import './Components/CSS/RecyclableComponents/React-boostrap-component.scss';
import './Components/CSS/RecyclableComponents/TextFieldGroup.scss';
import './Components/CSS/variables.scss';
// import './CSS/headerfix.scss';
// import './CSS/overwrite.scss';
// import './CSS/bootstrap.scss';
// import './CSS/bootstrap-responsive.scss';
// import './CSS/style.scss';
// import './CSS/default.scss';

const store = configureStore();

class App extends Component {
  render() {
    return (
     <Router history={history}>
       <Route path="/" render={(props) => {
         return (
           <Consumer>
             {context => <Main {...props} {...context}/>}
           </Consumer>
         )
       }}/>
     </Router>
    )
  }
}

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('main')
);
