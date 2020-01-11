import React, { Component } from 'react';
import './App.css';
import { Layout} from 'antd'
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Quiz from "./components/Quiz";
import Login from "./components/Login";
import Leaderboards from "./components/Leaderboards";
import RequireAuth from "./RequireAuth";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import SelectCategory from "./components/NewQuiz/SelectCategory";
import SelectDifficulty from "./components/NewQuiz/SelectDifficulty";
import Settings from "./components/Settings";
import Home from "./components/Home"

const { Content } = Layout;

const App = (props) => {
  let loggedIn = !props.auth.isEmpty;
  return (
        <Router>
          <Layout>
            <Header/>
            <Content>
              <Switch>
                <Route exact path="/">{!props.auth.isEmpty ? <RequireAuth><Home /></RequireAuth> : <div>Welcome to our project site</div>}</Route>
                <Route path="/leaderboards" component={Leaderboards} />
                <Route exact path="/new-quiz/:id" render={(props) => <RequireAuth><SelectDifficulty match={props.match} /></RequireAuth>} />
                <Route exact path="/new-quiz"><RequireAuth><SelectCategory /></RequireAuth></Route>
                <Route exact path="/quiz/:id/:difficulty(|easy|medium|hard)?" render={(props) => <RequireAuth><Quiz match={props.match}/></RequireAuth>} />
                <Route path="/login" render={(props) => {return !loggedIn ? <Login /> : props.history.push("/")}} />
                <Route path="/settings"><RequireAuth><Settings /></RequireAuth></Route>
                <Route exact={true}>Error 404. Page could not be found.</Route>
              </Switch>
            </Content>
            <Footer/>
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
