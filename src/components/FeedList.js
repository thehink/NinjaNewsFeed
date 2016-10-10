import React from 'react';

import FeedEntry from './FeedEntry';
import {Alert} from 'react-bootstrap';

class FeedList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="feeds">
        {this.props.error ? <Alert bsStyle="danger">Could not load feed... <br /><b>Error:</b> {this.props.error.message}</Alert> : ''}
        {this.props.feed.map(this.renderFeedEntry)}
        {this.props.isLoading?'Loading':''}
      </div>
    );
  }

  renderFeedEntry({id, author, title, content, likes, published, isLiked}) {
    return <FeedEntry
              key={id}
              id={id}
              author_fullname={author.fullname}
              author_username={author.username}
              author_avatar={author.avatar}
              title={title}
              content={content}
              likes={likes}
              published={published}
              isLiked={isLiked}
            />
  }

}

FeedList.defaultProps = {
};

export default FeedList;
