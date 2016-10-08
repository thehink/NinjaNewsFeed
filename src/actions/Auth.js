import React from 'react';
import Reflux from 'reflux';


const AuthActions = Reflux.createActions([
  'login',
  'logout',
  'getUser'
]);

export default AuthActions;
