import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import { Media, Alert, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';

import FeedActions from '../actions/Feed';
import FeedStore from '../stores/Feed';
import AuthStore from '../stores/Auth';


class CommentForm extends Reflux.Component {

constructor(props) {
  super(props);
  this.stores = [AuthStore, FeedStore];
  this.state = {
  }
}

onSubmitPost(event) {
  event.preventDefault();
  let body = ReactDOM.findDOMNode(this.refs.body).value;
  ReactDOM.findDOMNode(this.refs.body).value = '';
  FeedActions.newComment(body);
}

  render() {
    return (
      <form onSubmit={(e) => this.onSubmitPost(e)}>
        <FormGroup controlId="commentBody">
           <ControlLabel>Write a comment...</ControlLabel>
           <FormControl ref="body" componentClass="textarea" placeholder="textarea" />
         </FormGroup>
          <Button type="submit">
           Comment
         </Button>
      </form>
    );
  }


}

export default CommentForm;
