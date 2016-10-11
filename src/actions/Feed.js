import Reflux from 'reflux';
import Config from 'config';

const FeedActions = Reflux.createActions({
    'loadFeed': {
        children: ['completed', 'failed']
    },
    'loadPost': {
        children: ['completed', 'failed']
    },
    'newPost': {
        children: ['completed', 'failed']
    },
    'deletePost': {
        children: ['completed', 'failed']
    },
    'like': {
        children: ['completed', 'failed']
    },
    'loadComments': {
        children: ['completed', 'failed']
    },
    'newComment': {
        children: ['completed', 'failed']
    },
    'deleteComment': {
        children: ['completed', 'failed']
    }
});

FeedActions.newComment.listen(function(id, body) {
    let token = Reflux.GlobalState.authstore.token;

    if (!token)
        return this.failed('No Auth token');

    var options = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + token
        },
        body: JSON.stringify({
            'id': id,
            'body': body
        })
    };

    fetch(Config.api_endpoint + '/api/comments', options)
        .then(response => {
            return response.json();
        })
        .then(json => {
            let post = json.response;
            if (json.status >= 400) {
                throw new Error(json ? json.response : 'Bad response from server');
            }
            this.completed(post);
        })
        .catch(error => {
            this.failed(error);
        });
});

FeedActions.loadPost.listen(function(id) {
    //sync with server
    return id;
});

FeedActions.like.listen(function(id) {
    //sync with server
    return id;
});

FeedActions.loadComments.listen(function(id) {
    fetch(Config.api_endpoint + '/api/comments/' + id)
        .then(response => {
            if (response.status >= 400) {
                throw new Error('Bad response from server')
            }
            return response.json()
        })
        .then(json => {
            let feed = json.response;
            this.completed(feed);
        })
        .catch(error => {
            this.failed(error);
        });
});

FeedActions.loadFeed.listen(function() {
    fetch(Config.api_endpoint + '/api/feed')
        .then(response => {
            if (response.status >= 400) {
                throw new Error('Bad response from server')
            }
            return response.json()
        })
        .then(json => {
            let feed = json.response;
            this.completed(feed);
        })
        .catch(error => {
            this.failed(error);
        });
});

FeedActions.newPost.listen(function(title, body) {

    let token = Reflux.GlobalState.authstore.token;

    if (!token)
        return this.failed('No Auth token');

    var options = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + token
        },
        body: JSON.stringify({
            'title': title,
            'body': body
        })
    };

    fetch(Config.api_endpoint + '/api/feed', options)
        .then(response => {
            return response.json();
        })
        .then(json => {
            let post = json.response;
            if (json.status >= 400) {
                throw new Error(json ? json.response : 'Bad response from server');
            }
            this.completed(post);
        })
        .catch(error => {
            this.failed(error);
        });
});

export default FeedActions;
