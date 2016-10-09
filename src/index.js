import 'core-js/fn/object/assign';
import React from 'react';
import { render } from 'react-dom';
import Reflux from 'reflux';

Reflux.defineReact(React, Reflux);

// Import routing components
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './pages/App';
import Feed from './pages/Feed';
import Login from './pages/Login';
import About from './pages/About';
import Post from './pages/Post';
import NotFound from './pages/NotFound';

render(
  <Router history={browserHistory}>
    <Route path='/' component={ App }>
      <IndexRoute component={ Feed }/>
      <Route path='/feed' component={ Feed } />
      <Route path='/post/:id' component={ Post } />
      <Route path='/login' component={ Login } />
      <Route path='/about' component={ About } />
      <Route path='*' component={ NotFound } />
    </Route>
  </Router>,
    document.getElementById('app')
);
