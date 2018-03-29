import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React, { Component } from 'react';
import createHistory from "history/createBrowserHistory"
import { render }             from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import Header from './Components/Header';
import Home from './Components/Home';


const history = createHistory()



// import './CSS/app.scss';
// import './CSS/headerfix.scss';
// import './CSS/overwrite.scss';
// import './CSS/bootstrap.scss';
// import './CSS/bootstrap-responsive.scss';
// import './CSS/style.scss';
// import './CSS/default.scss';

class App extends Component {
  render() {
    return (
     <Router history={history}>
       <Route path="/" render={(props) => {
         return (
           <div>
             <Header {...props}/>
             <Home {...props}/>
           </div>
         )
       }}/>
     </Router>
    )
  }
}

render(
  <App/>,
  document.getElementById('main')
);
