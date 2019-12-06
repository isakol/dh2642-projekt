import React, { Component } from 'react';
import './App.css';
import { Layout, Col, Row, Badge, Avatar, Button, Dropdown, Menu, Icon } from 'antd'
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Quiz from "./components/Quiz";
import Login from "./components/Login";
import Leaderboards from "./components/Leaderboards";
import RequireAuth from "./RequireAuth";
import Header from "./components/Layout/Header"

const { Footer, Sider, Content } = Layout;

const App = () => {
  return (
        <Router>
          <Layout>
            <Header/>
            <Content>
              <Switch>
                <Route exact path="/"><RequireAuth><Quiz/></RequireAuth></Route>
                <Route path="/leaderboards" component={Leaderboards} />
                {/*<Route exact={true}>Error 404. Page could not be found.</Route>*/}
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

export default connect(mapStateToProps)(App);
