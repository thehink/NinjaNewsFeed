import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Col,
  Checkbox,
  ControlLabel,
  Alert,
  PageHeader
} from 'react-bootstrap';

import AuthStore from '../stores/Auth';
import AuthActions from '../actions/Auth';

class Login extends Reflux.Component {

  constructor(){
    super();
    this.store = AuthStore;
    this.state ={
      error: false
    }
  }

  onSubmit(event) {
    event.preventDefault();
    let email = ReactDOM.findDOMNode(this.refs.email).value;
    let password = ReactDOM.findDOMNode(this.refs.password).value;
    AuthActions.login(email, password);
  }

  render() {
    return (
    <div className="page">
      <PageHeader>Login</PageHeader>
      {this.state.authed ? (<Alert>Welcome {this.state.user.username}</Alert>) : this.renderForm()}
    </div>);
  }

  renderForm() {
    return (<Form className="login-form" horizontal onSubmit={(e) => this.onSubmit(e)}>
    <p>You can use username: <b>asd</b> and password: <b>asd</b> to login)</p>
      <FormGroup controlId="loginEmail">
        <Col componentClass={ControlLabel} sm={3}>
          Email/Username
        </Col>
        <Col sm={9}>
          <FormControl ref="email" type="text" placeholder="Username/Email" />
        </Col>
      </FormGroup>

      <FormGroup controlId="loginPassword">
        <Col componentClass={ControlLabel} sm={3}>
          Password
        </Col>
        <Col sm={9}>
          <FormControl ref="password" type="password" placeholder="Password" />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Checkbox>Remember me</Checkbox>
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">
            Sign in
          </Button>
        </Col>
      </FormGroup>
      <FormGroup>
      <Col smOffset={2} sm={10}>
      {this.state.loading && (
          <p>Loggin in...</p>
        )}
      {this.state.error && (
          <Alert bsStyle="danger">{this.state.error}</Alert>
        )}
        </Col>
        </FormGroup>
    </Form>)
  }
}

export default Login;
