import 'core-js/fn/object/assign';
import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './components/App';
import Feeds from './components/Feeds';
import Login from './components/Login';
import NotFound from './components/NotFound';


render(
  <Router history={browserHistory}>
    <Route path='/' component={ App }>
      <IndexRoute component={ Feeds }/>
      <Route path='/feeds' component={ Feeds } />
      <Route path='/login' component={ Login } />
      <Route path='*' component={ NotFound } />
    </Route>
  </Router>,
    document.getElementById('app')
);
