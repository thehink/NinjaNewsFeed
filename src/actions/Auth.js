import Reflux from 'reflux';
import Config from 'config';

const AuthActions = Reflux.createActions({
    'login': {
        children: ['completed', 'failed']
    },
    'logout': {
        children: ['completed', 'failed']
    },
    'getUser': {
        children: ['completed', 'failed']
    }
});

AuthActions.logout.listen(function() {
    //todo: logout server request
});

AuthActions.getUser.listen(function() {
    let token = Reflux.GlobalState.authstore.token;
    let obj = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + token
        }
    };

    fetch(Config.api_endpoint + '/api/user/auth', obj)
        .then(response => {
            if (response.status >= 400) {
                throw new Error('Bad response from server')
            }
            return response.json()
        })
        .then(json => {
            let user = json.response;
            this.completed(user);
        })
        .catch(error => {
            this.failed(error);
        });
});


AuthActions.login.listen(function(username, password) {
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
            this.completed(user);
        })
        .catch(error => {
            this.failed(error);
        });
});

export default AuthActions;
