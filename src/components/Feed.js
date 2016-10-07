import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Button} from 'react-bootstrap';

let Profile = require('../images/yeoman.png');

class Feeds extends React.Component {
  render() {
    return (
      <article className="feed-entry row">
      <div className="profile col-xs-12 col-sm-4">
        <img src={Profile} alt="Profle Picture" />
        <span>Author</span>
      </div>
      <div className="feed-wrapper col-xs-12 col-sm-8">
        <div className="arrow-left"></div>
        <h2>Feed Title</h2>
        <div className="feedContent">
           {this.props.content}
        </div>
        <div className="info">
          <ul>
            <li className="date">
              <Button className="date" bsSize="sm"><FontAwesome name='calendar-minus-o' /> 21th of October</Button>
            </li>
            <li className="likes">
              <Button bsSize="sm"><FontAwesome name='thumbs-up' /> 9001</Button>
            </li>
          </ul>
          </div>
      </div>
      </article>
    );
  }
}

Feeds.defaultProps = {
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
};

export default Feeds;
