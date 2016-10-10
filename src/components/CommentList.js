import React from 'react';
import Reflux from 'reflux';
import {Link} from 'react-router';
import { Media, Alert } from 'react-bootstrap';

import FeedActions from '../actions/Feed';
import FeedStore from '../stores/Feed';
import AuthStore from '../stores/Auth';

import CommentEntry from './CommentEntry';
import CommentForm from './CommentForm';

class CommentList extends Reflux.Component {

constructor(props){
  super(props);
  this.stores = [AuthStore, FeedStore];
  this.state = {
    loading: true,
    comments: []
  }
  FeedActions.loadComments(this.props.id);
}

renderCommentEntry({id, author, body, published}) {
  return <CommentEntry
            key={id}
            id={id}
            author_fullname={author.fullname}
            author_username={author.username}
            author_avatar={author.avatar}
            body={body}
            published={published}
          />
}

  render() {
    return (
      <div className="comments">
      <b>Comments</b>
      {this.state.comments.map(this.renderCommentEntry)}
      {this.state.isLoading?'Loading...':''}
      {this.state.error ? (<Alert bsStyle="danger">{this.state.error.message}</Alert>) : ''}
      {this.state.authed ? (
        <CommentForm id={this.props.id}/>) :
        (<div><Link to="/login">Login to post a comment...</Link></div>)
      }
      </div>
    );
  }


}

export default CommentList;
