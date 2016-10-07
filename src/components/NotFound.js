import React from 'react';
import { Alert } from 'react-bootstrap';

class NotFound extends React.Component {
  render() {
    return (
      <Alert bsStyle="warning">
        <strong>404</strong> - You are lost!
      </Alert>
    );
  }
}

NotFound.defaultProps = {
};

export default NotFound;
