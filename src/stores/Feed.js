import Reflux from 'reflux';
import FeedActions from '../actions/Feed';

class FeedStore extends Reflux.Store
{
  constructor() {
        super();
        this.listenables = FeedActions;
        this.state = {
          loading: false,
          feed: [],
          comments: []
        };
        FeedActions.loadFeed();
    }

    newComment(){
      this.setState({
        loading: true,
        error: false
      });
    }

    newCommentCompleted(comment){
      this.state.comments.unshift(comment);
      this.setState({
        loading: false,
        error: false
      });
    }

    newCommentFailed(error){
      this.setState({
        error: error,
        loading: false
      });
    }

  loadComments(){
    this.setState({
      loading: true,
      error: false
    });
  }

  loadCommentsCompleted(comments){
    this.setState({
      loading: true,
      error: false,
      comments: comments
    });
  }

  loadCommentsFailed(error) {
    this.setState({
      error: error,
      loading: false
    });
  }

  like(id) {
    this.state.feed.map((post) => {
      if(post.id == id){
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
      }
      return post;
    });
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

  newPost(){
    this.setState({
      loading: true,
      postError: false
    });
  }

  newPostCompleted(response){
    this.state.feed.unshift(response);
    this.setState({
      loading: false,
      postError: false,
      showNewPost: false
    });
  }

  newPostFailed(error){
    this.setState({
      loading: false,
      postError: error
    });
  }

  static get id() {
      return 'feedstore';
  }

}

export default FeedStore;
