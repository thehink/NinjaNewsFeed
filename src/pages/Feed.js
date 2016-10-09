import React from 'react';
import Reflux from 'reflux';

//stores
import AuthStore from '../stores/Auth';
import FeedStore from '../stores/Feed';

//action
import FeedActions from '../actions/Feed';

//Components
import FeedList from '../components/FeedList';
import NewPostModal from '../components/NewPost';

import {PageHeader} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class Feed extends Reflux.Component
{
    constructor(props) {
        super(props);
        this.state = {
          showNewPost: false
        };
        this.stores = [AuthStore, FeedStore];
    }

    componentDidMount() {

    }

    showAddPost(){

    }

    refreshFeeds(){
      FeedActions.loadFeed();
    }

    render() {
        let lgClose = () => this.setState({ showNewPost: false });
        let lgShow = () => this.setState({ showNewPost: true });

        return (
          <div className="feed-page page">
          <NewPostModal show={this.state.showNewPost} onHide={lgClose}/>
          <PageHeader>Feed <span><FontAwesome className='feed-controls' name='refresh' onClick={this.refreshFeeds} /></span> {this.state.authed && (<span><FontAwesome className='feed-controls add-post-button' name='plus' onClick={lgShow} /></span>)}</PageHeader>
            <FeedList
              feed={this.state.feed}
              isLoading={this.state.loading}
              error={this.state.error}
               />
             </div>
        );
    }
}

export default Feed;
