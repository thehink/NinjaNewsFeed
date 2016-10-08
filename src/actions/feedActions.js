import React from 'react';
import Reflux from 'reflux';
import Config from 'config';

const FeedActions = Reflux.createActions({
  'loadFeed': {children: ['completed', 'failed']}
});

FeedActions.loadFeed.listen(function(){
  // make your api call/ async stuff here
  // we use setTimeout for faking async behaviour here
  console.log(this.prototype);
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

export default FeedActions;
