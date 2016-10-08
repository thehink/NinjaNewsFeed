import React from 'react';
import FontAwesome from 'react-fontawesome';
import Fetch from 'isomorphic-fetch'

import FeedList from './FeedList';

class FeedContainer extends React.Component {
/*
  getInitialState() {
    return {
      loading: false,
      feed: []
    }
  }*/

  constructor() {
    super();
    this.state = {
      loading: false,
      error: false,
      feed: []
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });

    fetch('http://localhost/api/feed')
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }

      return response.json()
    })
    .then(json => {
      let feed = json.response;
      this.setState({
        isLoading: false,
        feed: feed
      });
      //if(this.props.onSuccess) this.props.onSuccess(json)
    })
    .catch(error => {
      console.log(error);
      this.setState({
        isLoading: false,
        error: error,
        feed: []
      });
      //if(this.props.onError) this.props.onError(error)
    })
    }

  render() {
    return (
      <FeedList
        feed={this.state.feed}
        isLoading={this.state.isLoading}
        error={this.state.error}
         />
    );
  }
}

export default FeedContainer;
