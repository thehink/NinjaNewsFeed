import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal, FormGroup, ControlLabel, FormControl, Alert} from 'react-bootstrap';

import FeedActions from '../actions/Feed';

class NewPostModal extends React.Component {

  constructor(props) {
    super(props);
  }

  onSubmitPost(event){
    event.preventDefault();

    let title = ReactDOM.findDOMNode(this.refs.title).value;
    let content = ReactDOM.findDOMNode(this.refs.content).value;
    FeedActions.newPost(title, content);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} bsSize="large" aria-labelledby="contained-modal-title-sm">
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

         </form><br />
         {this.props.error ? <Alert bsStyle="danger"><b>Error:</b> {this.props.error.message}</Alert> : ''}
       </Modal.Body>
       <Modal.Footer>
         <Button onClick={this.props.onHide}>Close</Button>
       </Modal.Footer>
     </Modal>
    );
  }
}

export default NewPostModal;
