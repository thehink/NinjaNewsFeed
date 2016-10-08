import React from 'react';
import Reflux from 'reflux';
import FeedActions from '../actions/feedActions';

class FeedStore extends Reflux.Store
{
  constructor() {
        super();
        this.listenables = FeedActions;
        this.state = {
          loading: false,
          feed: []
        };
        FeedActions.loadFeed();
    }

  loadFeed() {
    this.setState({
      loading: true,
      error: false
    });
  }

  loadFeedCompleted(feed) {
    this.setState({
      feed : feed,
      error: false,
      loading: false
    });
  }

  loadFeedFailed(error) {
    this.setState({
      error: error,
      loading: false
    });
  }

  static get id() {
      return 'feedstore';
  }

};

export default FeedStore;
