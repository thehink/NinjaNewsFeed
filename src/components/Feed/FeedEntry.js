import React from 'react';
import Config from 'config';
import FontAwesome from 'react-fontawesome';
import {Button, Badge, Label} from 'react-bootstrap';
import {Link} from 'react-router';

class FeedEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.likes,
      like: false
    }
  }

  onLike(){
    this.setState({
      likes: this.state.likes + 1,
      like: !this.state.like
    });
  }

  render() {
    return (
      <article className="feed-entry row">
      <div className="profile col-xs-12 col-sm-4">
        <img src={Config.api_endpoint + '/api/avatar/' + this.props.author_avatar} alt="Profle Picture" />
        <span>{this.props.author_fullname}</span>
      </div>
      <div className="feed-wrapper col-xs-12 col-sm-8">
        <div className="arrow-left"></div>
        <h2><Link to={'/feed/' + this.props.id} className="title-link">{this.props.title}</Link></h2>
        <div className="feedContent">
           {this.props.content.length > 300 ? this.props.content.substr(0,300) +'...' : this.props.content + ' '}
            <br/><Link to={'/feed/' + this.props.id} className="post-link">Read more...</Link>
        </div>
        <div className="info">
          <ul>
            <li className="date">
              <FontAwesome name='calendar-minus-o' /> {this.props.published}
            </li>
            <li className="likes" onClick={() => this.onLike()}>
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
