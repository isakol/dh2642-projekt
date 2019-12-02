import React from 'react';
import './App.css';
import { Layout, Col, Row, Badge, Avatar } from 'antd'
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <Row type="flex" justify="space-between">
          <Col><div className="logo">Group 7</div></Col>
          <Col>
            <Badge count={1}>
              <Avatar shape="circle" icon="user" size="large" />
            </Badge>
            <span className="username">Username</span>
          </Col>
        </Row>
      </Header>
      <Content>
        <Row>
          <Col className="home-left" span={12}>
            Left
          </Col>
          <Col span={12}>
            Right
          </Col>
        </Row>
      </Content>
      <Footer style={{textAlign: 'center'}}>
        © 2019 Erik Mickols, Isak Olsson
      </Footer>
    </Layout>
  );
}

export default App;
