import React from 'react';

import FeedEntry from './FeedEntry';
import {PageHeader, Alert} from 'react-bootstrap';

class FeedList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="feeds">
        {this.props.feed.map(this.renderFeedEntry)}
        {this.props.isLoading?'Loading':''}
        {this.props.error ? <Alert bsStyle="danger">Could not load feed...</Alert> : ''}
      </div>
    );
  }

  renderFeedEntry({id, author, title, content, likes, published}) {
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
            />
  }

}

FeedList.defaultProps = {
};

export default FeedList;
