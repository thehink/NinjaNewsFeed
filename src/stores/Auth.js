import React from 'react';
import Reflux from 'reflux';
Reflux.defineReact(React, Reflux);

import Config from 'config';

import AuthActions from '../actions/Auth';

class AuthStore extends Reflux.Store
{
  constructor() {
        super();
        this.listenables = AuthActions;
        this.state = {
          user: null,
          authed: false,
          token: localStorage.getItem('token'),
          loading: false
        };
        if(localStorage.getItem('token'))
          AuthActions.getUser();
    }

  onGetUser() {
    let obj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Token ' + this.state.token
      }};

      fetch(Config.api_endpoint + '/api/user/auth', obj)
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response from server')
        }
        return response.json()
      })
      .then(json => {
        let user = json.response;
        this.setUser(user);
      })
      .catch(error => {
        this.setState({error: error});
        this.setUser();
      });
  }

  onLogin(username, password) {
    var options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'username': username,
        'password': password
      })
    };

      fetch(Config.api_endpoint + '/api/user/login', options)
      .then(response => {
        return response.json()
      })
      .then(json => {
        let user = json.response;
        if (json.status >= 400) {
          throw new Error(json ? json.response : 'Bad response from server');
        }
        this.setUser(user);
      })
      .catch(error => {
        this.setUser();
        this.setState({error: error.message});
      });
  }

  onLogout() {
    //todo: do a server request
    this.setUser();
  }

  setUser(user){
    if(user){
      localStorage.setItem('token', user.token);
      this.setState({
        user: user,
        authed: true,
        token: localStorage.getItem('token'),
        loading: false,
        error: false
      });
    }else{
      localStorage.removeItem('token');
      this.setState({
        user: null,
        authed: false,
        token: null,
        loading: false
      });
    }

  }

  getAuthHeader() {
    var obj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Token ' + this.state.token,
        'Origin': ''
      },
      body: null
    };

    return obj;
  }

  isUserAuthed() {
    return this.state.authed;
  }

  static get id() {
      return 'authstore'
  }
}

export default AuthStore;
