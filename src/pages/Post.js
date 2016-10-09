import React from 'react';
import Reflux from 'reflux';
import { Media, PageHeader } from 'react-bootstrap';

import FeedEntry from '../components/FeedEntry';
import CommentList from '../components/CommentList';

import FeedActions from '../actions/Feed';
import FeedStore from '../stores/Feed';
import AuthStore from '../stores/Auth';

class PostPage extends Reflux.Component {

  constructor(props){
    super(props);
    this.stores = [FeedStore, AuthStore];

    let id = parseInt(this.props.routeParams.id);

    this.state = {
      postId: id
    }

    FeedActions.loadPost(id);
  }

  getPost(){
    let post = this.state.feed.find((post) => {
        return post.id == this.state.postId;
    });

    if(post)
      return (<FeedEntry
          key={post.id}
          id={post.id}
          author_fullname={post.author.fullname}
          author_username={post.author.username}
          author_avatar={post.author.avatar}
          title={post.title}
          content={post.content}
          likes={post.likes}
          published={post.published}
          isLiked={post.isLiked}
          fullPost={true}
        />);
  }



  render() {
    let post = this.getPost();
    return (
      <div className="page">
        <PageHeader>Post</PageHeader>
        {post ? post : 'Loading...'}
        <CommentList id={this.state.postId} />
      </div>
    );
  }
}

export default PostPage;
