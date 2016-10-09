import React from 'react';
import Config from 'config';
import { Media } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class CommentEntry extends React.Component {
  render() {
    return (
      <Media>
        <Media.Left align="top">
          <img width={64} height={64} src={Config.api_endpoint + '/api/avatar/' + this.props.author_avatar} alt="Avatar"/>
        </Media.Left>
        <Media.Body>
          <Media.Heading>@{this.props.author_username}</Media.Heading>
          {this.props.body}
          <br/>
          <FontAwesome name='calendar-minus-o' />{this.props.published}

        </Media.Body>
      </Media>
    );
  }
}

export default CommentEntry;
