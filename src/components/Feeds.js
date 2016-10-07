import React from 'react';
import Fetch from 'react-fetch'

import Feed from './feed';
import {PageHeader} from 'react-bootstrap';

class Feeds extends React.Component {

  render() {
    return (
      <div className="feeds">
        <PageHeader>Feed <small> - a feed</small></PageHeader>
        <Feed/>
        <Feed/>
        <Feed/>
        <Feed/>
      </div>
    );
  }
}

Feeds.defaultProps = {
};

export default Feeds;
