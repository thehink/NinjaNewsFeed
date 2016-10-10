import React from 'react';
import Reflux from 'reflux';
Reflux.defineReact(React, Reflux);

import Config from 'config';

import AuthActions from '../actions/Auth';

class AuthStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = AuthActions;
        this.state = {
            user: null,
            authed: false,
            token: localStorage.getItem('token'),
            loading: false
        };
        if (localStorage.getItem('token'))
            AuthActions.getUser();
    }

    onGetUser() {

    }

    onGetUserCompleted(user) {
        this.setUser(user);
    }

    onGetUserFailed(error) {
        this.setState({
            error: error
        });
        this.setUser();
    }

    onLogin(username, password) {

    }

    onLoginCompleted(user) {
        this.setUser(user);
    }

    onLoginFailed(error) {
        this.setUser();
        this.setState({
            error: error.message
        });
    }

    onLogout() {
        //todo: do a server request
        this.setUser();
    }

    setUser(user) {
        if (user) {
            localStorage.setItem('token', user.token);
            this.setState({
                user: user,
                authed: true,
                token: localStorage.getItem('token'),
                loading: false,
                error: false
            });
        } else {
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
