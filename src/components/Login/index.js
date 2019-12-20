import React, { Component } from "react";
import { connect } from "react-redux";
import { signup, signin} from "../../redux/actions/auth";
import {Form, Icon, Input, Button, Col, Card} from "antd";
import "./Login.css"

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const responsiveContainer = {
  xs: {span: 24},
  md: {span: 8, offset: 8}
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: false,
      errors: {},
      email: "",
      password: "",
      isSubmitting: false
    }
  }

  submitClick = (e, check) => {
    if (e) e.preventDefault();
    let errors = {};

    if (!this.state.email) {
      errors = {emptyEmail: "Please enter an e-mail address."};
    } else if (this.state.email && !/\S+@\S+\.\S+/.test(this.state.email)) {
      errors = {...errors, invalidEmail: "Please enter a a valid e-mail address."};
    }
    if (!this.state.password) {
      errors = {...errors, emptyPassword: "Please enter a password."};
    }

    this.setState({
      isSubmitting: true,
      errors: errors
    }, () => {
      if (Object.keys(this.state.errors).length === 0 && this.state.isSubmitting) {
        if (this.state.newUser) {
          this.props.signup(this.state.email, this.state.password);
        } else {
          this.props.signin(this.state.email, this.state.password);
        }
      }
    });

  }

  passwordChange = e => {
    e.persist();
    this.setState({password: e.target.value});
  };

  emailChange = e => {
    e.persist();
    this.setState({email: e.target.value})
  }

  render() {
    return (
      <div className="login-flex">
        <Col className="login-box" {...responsiveContainer}>
          <Card title={this.state.newUser ? "Create account" : "Sign in"}>
          <Form onSubmit={this.submitClick} {...formItemLayout}>
            {this.props.message && <p className="login-error">{this.props.message}</p>}
            <Form.Item
              label="E-mail"
              labelAlign="left"
              validateStatus={(this.state.errors.emptyEmail || this.state.errors.invalidEmail) ? "error" : null}
              help={this.state.errors.emptyEmail ? "Please enter an e-mail address" : this.state.errors.invalidEmail ? "Please enter a valid e-mail address" : null}
            >
              <Input type="email" value={this.state.email} placeholder="E-mail address" onChange={this.emailChange} />
            </Form.Item>

            <Form.Item
              label="Password"
              labelAlign="left"
              validateStatus={this.state.errors.emptyPassword ? "error" : null}
              help={this.state.errors.emptyPassword ? "Please enter a password" : null}
            >
              <Input type="password" value={this.state.password} placeholder="Password" onChange={this.passwordChange} />
            </Form.Item>

              <Button type="primary" htmlType="submit" loading={this.props.loading == "LOADING" ? true : false} block>{this.state.newUser ? "Create account" : "Sign in"}</Button>

              <div className="login-footer">
                <div>{this.state.newUser ? "Already have an account?" : "Don't have an account?"}</div>
                <Button onClick={() => {this.setState({newUser: !this.state.newUser})}} block>{this.state.newUser ? "Sign in" : "Create account"}</Button>
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
    message: state.authReducer.message,
    loading: state.loadingReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signup: (email, password) => dispatch(signup(email, password)),
    signin: (email, password, callback) => dispatch(signin(email, password, callback)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
