import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './components/App';
import Feeds from './components/Feeds';
/*import Login from './components/Login';
import About from './components/About';
import NotFound from './components/NotFound';
*/

/**
 * The React Router routes for both the server and the client.
 */
const Routes = (
  <Router history={browserHistory}>
    <Route path='/' component={ App }>
      <IndexRoute component={ Feeds }/>
      <Route path='/feeds' component={ Feeds } />
    </Route>
  </Router>
);

/*
<IndexRoute component={ Feeds }/>
<Route path='/feeds' component={ Feeds } />
<Route path='/login' component={ Login } />
<Route path='/about' component={ About } />
<Route path='*' component={NotFound}/>
*/

console.log(Routes)

export default Routes;
