import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
import {Button, Badge, Label, Modal, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import {Link} from 'react-router';

import FeedActions from '../actions/feedActions';

class NewPostModal extends React.Component {

  constructor(props) {
    super(props);
  }

  onSubmitPost(event){
    event.preventDefault();

    let title = ReactDOM.findDOMNode(this.refs.title).value;
    let content = ReactDOM.findDOMNode(this.refs.content).value;
    FeedActions.newPost(title, content);
    this.props.onHide();
  }

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-sm">
       <Modal.Header closeButton>
         <Modal.Title id="contained-modal-title-sm">New Post</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <form onSubmit={(e) => this.onSubmitPost(e)}>
         <FormGroup controlId="postTitle">
           <ControlLabel>Title</ControlLabel>
           <FormControl ref="title" type="text" placeholder="title"/>
         </FormGroup>

         <FormGroup controlId="postContent">
            <ControlLabel>Content</ControlLabel>
            <FormControl ref="content" componentClass="textarea" placeholder="textarea" />
          </FormGroup>
           <Button type="submit">
            Post
          </Button>
         </form>
       </Modal.Body>
       <Modal.Footer>
         <Button onClick={this.props.onHide}>Close</Button>
       </Modal.Footer>
     </Modal>
    );
  }
}

export default NewPostModal;
