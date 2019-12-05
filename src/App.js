import React, { Component } from 'react';
import './App.css';
import { Layout, Col, Row, Badge, Avatar, Button } from 'antd'
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import QuizContainer from "./components/Quiz/QuizContainer";
import Login from "./components/Login/Login"
import {signout} from "./redux/actions/auth"

const { Header, Footer, Sider, Content } = Layout;

const App = ({ auth, signoutClick}) => {
  return (
        <Router>
          <Layout>
            <Header>
              <Row type="flex" justify="space-between">
                <Col className="header-start">
                  <span className="logo"><Link to="/">InQuizitor</Link></span>
                  <span className="start-button">
                    <Link to="/new-quiz">
                      <Button type="primary" shape="round" size="large">Start quiz</Button>
                    </Link>
                  </span>
                  <span><Link to="/leaderboards">Leaderboards</Link></span>
                </Col>
                <Col>
                  <Badge count={1}>
                    <Avatar shape="circle" icon="user" size="large" />
                  </Badge>
                </Col>
              </Row>
            </Header>
            <Content>
              <Switch>
                <Route exact path="/">
                  {!auth.isLoaded ? "Loading..." : !auth.isEmpty ? <QuizContainer /> : <Login />}
                </Route>
              </Switch>
            </Content>
            <Footer style={{textAlign: 'center'}}>
              © 2019 Erik Mickols, Isak Olsson
            </Footer>
          </Layout>
        </Router>
  );
};


function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signoutClick: () => dispatch(signout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
