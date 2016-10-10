require('normalize.css/normalize.css');
require('styles/Bootstrap.min.css');
require('styles/font-awesome.min.css');
require('styles/App.css');

import React from 'react';
import {Link} from 'react-router';
import Reflux from 'reflux';

Reflux.defineReact(React, Reflux);

import AuthStore from '../stores/Auth';
import AuthActions from '../actions/Auth';

class App extends Reflux.Component {

  constructor(props) {
      super(props);
      this.state = {};
      this.store = AuthStore;
  }

  onLogout(event){
    event.preventDefault();
    AuthActions.logout();
  }

  render() {



    return (
      <app>
          <nav className="navbar navbar-top navbar-dark bg-inverse">
          <div className="container">
           <Link to={'/'} className="navbar-brand">Ninja News Feed</Link>
           <ul className="nav navbar-nav">
             <li className="nav-item">
               <Link to={'/feed'} className="nav-link">Feed</Link>
             </li>
             <li className="nav-item">
               <Link to={'/about'} className="nav-link">About</Link>
             </li>
           </ul>
           {this.state.authed && (
           <ul className="nav navbar-nav pull-xs-right">
             <li className="nav-item">
               <a href="" className="nav-link" onClick={(e) => this.onLogout(e)}>Logout {this.state.user.username}</a>
             </li>
           </ul>)}

           {!this.state.authed && (
           <ul className="nav navbar-nav pull-xs-right">
             <li className="nav-item">
               <Link to={'/login'} className="nav-link">Login</Link>
             </li>
           </ul>)}

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
