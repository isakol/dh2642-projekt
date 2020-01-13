import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Col, Card } from "antd";
import { withFirebase } from "react-redux-firebase";
import {withRouter} from "react-router-dom";
import "./Login.css";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
};

const responsiveContainer = {
  xs: { span: 24 },
  md: { span: 8, offset: 8 }
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: false,
      errors: {},
      email: "",
      username: "",
      password: "",
      loading: false,
      isSubmitting: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.isLoaded !== this.props.auth.isLoaded || prevProps.auth.isEmpty !== this.props.auth.isEmpty) {
      if (!this.props.auth.isEmpty) {
        this.props.history.push("/");
      }
    }
  }

  submitClick = (e, check) => {
    if (e) e.preventDefault();
    let errors = {};

    if (!this.state.email) {
      errors = { emptyEmail: "Please enter an e-mail address." };
    } else if (this.state.email && !/\S+@\S+\.\S+/.test(this.state.email)) {
      errors = {
        ...errors,
        invalidEmail: "Please enter a a valid e-mail address."
      };
    }

    if (this.state.newUser && !this.state.username) {
      errors = { ...errors, emptyUsername: "Please enter a username." };
    }
    if (!this.state.password) {
      errors = { ...errors, emptyPassword: "Please enter a password." };
    }

    this.setState(
      {
        isSubmitting: true,
        errors: errors
      },
      () => {
        if (
          Object.keys(this.state.errors).length === 0 &&
          this.state.isSubmitting
        ) {
          this.setState({ loading: true });
          if (this.state.newUser) {
            this.props.firebase
              .ref("users")
              .orderByChild("displayName")
              .equalTo(this.state.username)
              .limitToFirst(1)
              .once("value", snapshot => {
                if (!snapshot.exists()) {
                  this.props.firebase
                    .createUser(
                      {
                        email: this.state.email,
                        password: this.state.password,
                        displayName: this.state.username
                      },
                      { points: 0, displayName: this.state.username }
                    )
                    .finally(() => {
                      this.setState({ loading: false });
                    });
                } else {
                  errors = {
                    ...errors,
                    invalidUsername: "This username is already in use."
                  };
                  this.setState({ errors: errors, loading: false });
                }
              });
          } else {
            this.props.firebase
              .login({ email: this.state.email, password: this.state.password })
              .finally(() => {
                this.setState({ loading: false });
              });
          }
        }
      }
    );
  };

  passwordChange = e => {
    e.persist();
    this.setState({ password: e.target.value });
  };

  usernameChange = e => {
    e.persist();
    this.setState({ username: e.target.value });
  };

  emailChange = e => {
    e.persist();
    this.setState({ email: e.target.value });
  };

  render() {
    return (
      <div className="login-flex">
        <Col className="login-box" {...responsiveContainer}>
          <Card title={this.state.newUser ? "Create account" : "Sign in"}>
            <Form onSubmit={this.submitClick} {...formItemLayout}>
              {this.props.authError !== null && (
                <p className="login-error">{this.props.authError.message}</p>
              )}
              <Form.Item
                label="E-mail"
                labelAlign="left"
                validateStatus={
                  this.state.errors.emptyEmail || this.state.errors.invalidEmail
                    ? "error"
                    : null
                }
                help={
                  this.state.errors.emptyEmail
                    ? "Please enter an e-mail address"
                    : this.state.errors.invalidEmail
                    ? "Please enter a valid e-mail address"
                    : null
                }
              >
                <Input
                  type="email"
                  value={this.state.email}
                  placeholder="E-mail address"
                  onChange={this.emailChange}
                />
              </Form.Item>

              {this.state.newUser ? (
                <Form.Item
                  label="Username"
                  labelAlign="left"
                  validateStatus={
                    this.state.errors.emptyUsername ||
                    this.state.errors.invalidUsername
                      ? "error"
                      : null
                  }
                  help={
                    this.state.errors.emptyUsername
                      ? "Please enter a username"
                      : this.state.errors.invalidUsername
                      ? this.state.errors.invalidUsername
                      : null
                  }
                >
                  <Input
                    type="username"
                    value={this.state.username}
                    placeholder="Username"
                    onChange={this.usernameChange}
                  />
                </Form.Item>
              ) : null}

              <Form.Item
                label="Password"
                labelAlign="left"
                validateStatus={
                  this.state.errors.emptyPassword ? "error" : null
                }
                help={
                  this.state.errors.emptyPassword
                    ? "Please enter a password"
                    : null
                }
              >
                <Input
                  type="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.passwordChange}
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
                block
              >
                {this.state.newUser ? "Create account" : "Sign in"}
              </Button>

              <div className="login-footer">
                <div>
                  {this.state.newUser
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </div>
                <Button
                  onClick={() => {
                    this.setState({ newUser: !this.state.newUser });
                  }}
                  block
                >
                  {this.state.newUser ? "Sign in" : "Create account"}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authError: state.firebaseReducer.authError,
    auth: state.firebaseReducer.auth
  };
}

export default withFirebase(withRouter(connect(mapStateToProps)(Login)));
