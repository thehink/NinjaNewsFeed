import React from 'react';
import { Alert } from 'react-bootstrap';

class NotFound extends React.Component {
  render() {
    return (
      <div className="page">
        <Alert bsStyle="warning">
          <strong>404</strong> - You are lost!
        </Alert>
      </div>
    );
  }
}

NotFound.defaultProps = {
};

export default NotFound;
