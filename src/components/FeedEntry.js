import React from 'react';
import Reflux from 'reflux';
import Config from 'config';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router';

import FeedActions from '../actions/Feed';
import AuthStore from '../stores/Auth';

class FeedEntry extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = AuthStore;
    this.state = {
      likes: this.props.likes,
      isLiked: this.props.isLiked
    }
  }

  onLike(){
    if(!this.state.authed)
      return alert('You need to login!');

    FeedActions.like(this.props.id);
    if(!this.state.isLiked)
      this.setState({
        likes: this.state.likes + 1,
        isLiked: true
      });
    else{
      this.setState({
        likes: this.state.likes - 1,
        isLiked: false
      });
    }
  }

  render() {
    let Content = this.props.content.length > 300 && !this.props.fullPost ? this.props.content.substr(0,300) +'...' : this.props.content + ' ';

    return (
      <article className="feed-entry row">
      <div className="profile col-xs-12 col-sm-4">
        <img src={Config.api_endpoint + '/api/avatar/' + this.props.author_avatar} alt="Profle Picture" />
        <Link to={'/user/' + this.props.author_username} className="user-link">@{this.props.author_username}</Link>
      </div>
      <div className="feed-wrapper col-xs-12 col-sm-8">
        <div className="arrow-left"></div>
        <h2><Link to={'/post/' + this.props.id} className="title-link">{this.props.title}</Link></h2>
        <div className="feedContent">
            {Content}
            <br/>
            {!this.props.fullPost &&
            (<Link to={'/post/' + this.props.id} className="post-link">Read more...</Link>)}
        </div>
        <div className="info">
          <ul>
          <li className="author">
            <FontAwesome name='user' /> {this.props.author_fullname}
          </li>
            <li className="date">
              <FontAwesome name='calendar-minus-o' /> {this.props.published}
            </li>
            <li className={'like-button ' + (this.state.isLiked ? 'post-liked' : '')} onClick={() => this.onLike()}>
              <FontAwesome name='thumbs-up' /> {this.state.likes}
            </li>
          </ul>
          </div>
      </div>
      </article>
    );
  }
}

FeedEntry.defaultProps = {
  //content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
};

export default FeedEntry;
