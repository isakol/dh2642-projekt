import React from 'react';
import './App.css';
import { Layout, Col, Row, Badge, Avatar, Button } from 'antd'
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QuizContainer from "./components/Quiz/QuizContainer";

const { Header, Content, Footer } = Layout;

function App() {
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
              <QuizContainer />
            </Route>
          </Switch>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          © 2019 Erik Mickols, Isak Olsson
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
