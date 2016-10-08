import 'core-js/fn/object/assign';
import React, { Component } from 'react';
import { render } from 'react-dom';
import Reflux from 'reflux';

Reflux.defineReact(React, Reflux);

// Import routing components
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import AuthStore from './stores/Auth';

import App from './components/App';
import Feed from './pages/Feed';
import Login from './pages/Login';
import NotFound from './components/NotFound';

render(
  <Router history={browserHistory}>
    <Route path='/' component={ App }>
      <IndexRoute component={ Feed }/>
      <Route path='/feed' component={ Feed } />
      <Route path='/login' component={ Login } />
      <Route path='*' component={ NotFound } />
    </Route>
  </Router>,
    document.getElementById('app')
);
