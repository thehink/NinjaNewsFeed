require('normalize.css/normalize.css');
require('styles/Bootstrap.min.css');
require('styles/font-awesome.min.css');
require('styles/App.css');

import React, { Component } from 'react';
import {Link} from 'react-router';

class App extends Component {
  render() {
    return (
      <app>
          <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
          <div className="container">
           <Link to={'/'} className="navbar-brand">Ninja News Feed</Link>
           <ul className="nav navbar-nav">
             <li className="nav-item active">
               <Link to={'/feeds'} className="nav-link">Feeds <span className="sr-only">(current)</span></Link>
             </li>
             <li className="nav-item">
               <Link to={'/about'} className="nav-link">About</Link>
             </li>
             <li className="nav-item">
               <Link to={'/login'} className="nav-link">Login</Link>
             </li>
           </ul>
         </div>
       </nav>

       <div className="container">
         {this.props.children}

       </div>
   </app>
    );
  }
}

App.defaultProps = {
};

export default App;
