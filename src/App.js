import React, { Component } from 'react';
import './App.css';
import { Layout, Col, Row, Badge, Avatar, Button, Dropdown, Menu, Icon } from 'antd'
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Quiz from "./components/Quiz";
import Login from "./components/Login";
import Leaderboards from "./components/Leaderboards";
import RequireAuth from "./RequireAuth";
import Header from "./components/Layout/Header";
import SelectCategory from "./components/NewQuiz/SelectCategory";
import SelectDifficulty from "./components/NewQuiz/SelectDifficulty";

const { Footer, Sider, Content } = Layout;

const App = () => {
  return (
        <Router>
          <Layout>
            <Header/>
            <Content>
              <Switch>
                <Route exact path="/"><div>Welcome home</div></Route>
                <Route path="/leaderboards" component={Leaderboards} />
                <Route exact path="/new-quiz/:id" render={(props) => <RequireAuth><SelectDifficulty match={props.match} /></RequireAuth>} />
                <Route exact path="/new-quiz"><RequireAuth><SelectCategory /></RequireAuth></Route>
                <Route exact path="/quiz/:id/:difficulty(|easy|medium|hard)?" render={(props) => <RequireAuth><Quiz match={props.match}/></RequireAuth>} />
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
