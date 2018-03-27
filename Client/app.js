import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './CSS/app.scss';
import './CSS/headerfix.scss';


class App extends Component {
  render() {
    return (
     <Router>
       <div>
         <header>
           <div className="cbp-af-header">
             <div className=" cbp-af-inner">
               <div className="container">
                 <div className="row">
                   <div className="span4">
                     <div className="logo">
                       <h1><a href="index.html">Plato</a></h1>
                     </div>
                   </div>
                   <div className="span8">
                     <div className="navbar">
                       <div className="navbar-inner">
                         <nav>
                           <ul className="nav topnav">
                             <li className="dropdown active">
                               <a href="index.html">Home</a>
                             </li>
                             <li className="dropdown">
                               <a href="#">Features</a>
                               <ul className="dropdown-menu">
                                 <li><a href="scaffolding.html">Scaffolding</a></li>
                                 <li><a href="base-css.html">Base CSS</a></li>
                                 <li><a href="components.html">Components</a></li>
                                 <li><a href="icons.html">Icons</a></li>
                                 <li><a href="list.html">Styled lists</a></li>
                                 <li><Link to="/hello">Hello</Link></li>
                                 <li className="dropdown"><a href="#">3rd level</a>
                                   <ul className="dropdown-menu sub-menu">
                                     <li><a href="#">Example menu</a></li>
                                     <li><a href="#">Example menu</a></li>
                                     <li><a href="#">Example menu</a></li>
                                   </ul>
                                 </li>
                               </ul>
                             </li>
                             <li className="dropdown">
                               <a href="#">Pages</a>
                               <ul className="dropdown-menu">
                                 <li><a href="about.html">About us</a></li>
                                 <li><a href="pricingtable.html">Pricing table</a></li>
                                 <li><a href="fullwidth.html">Fullwidth</a></li>
                                 <li><a href="404.html">404</a></li>
                               </ul>
                             </li>
                             <li className="dropdown">
                               <a href="#">Portfolio</a>
                               <ul className="dropdown-menu">
                                 <li><a href="portfolio-2cols.html">Portfolio 2 columns</a></li>
                                 <li><a href="portfolio-3cols.html">Portfolio 3 columns</a></li>
                                 <li><a href="portfolio-4cols.html">Portfolio 4 columns</a></li>
                                 <li><a href="portfolio-detail.html">Portfolio detail</a></li>
                               </ul>
                             </li>
                             <li className="dropdown">
                               <a href="/hi">Blog</a>
                               <ul className="dropdown-menu">
                                 <li><a href="blog_left_sidebar.html">Blog left sidebar</a></li>
                                 <li><a href="blog_right_sidebar.html">Blog right sidebar</a></li>
                                 <li><a href="post_left_sidebar.html">Post left sidebar</a></li>
                                 <li><a href="post_right_sidebar.html">Post right sidebar</a></li>
                               </ul>
                             </li>
                             <li>
                               <a href="contact.html">Contact</a>
                             </li>
                           </ul>
                         </nav>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </header>
         <Switch>
           <Route path='/hello' component={B}/>
         </Switch>
       </div>
     </Router>
    )
  }
}
class B extends Component {
  render() {
    return <div>Hello</div>
  }
}

ReactDOM.render(
  <App></App>,
  document.getElementById('main')
);
