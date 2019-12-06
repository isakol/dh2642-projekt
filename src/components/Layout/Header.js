import React from "react";
import { Layout, Col, Row, Button, Dropdown, Menu, Icon } from 'antd';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {signout} from "../../redux/actions/auth";
import { withRouter } from 'react-router-dom';
import "./Header.css"

const { Header} = Layout;

const LayoutHeader = (props) => {
  return (
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
          {!props.auth.isLoaded ? "" :
            !props.auth.isEmpty ?
              <Dropdown trigger={['click']} overlay={
                <Menu>
                  <Menu.Item key="1"><Icon type="user" /> My profile</Menu.Item>
                  <Menu.Item key="2"><Icon type="setting" /> Settings</Menu.Item>
                  <Menu.Item onClick={props.signoutClick} className="logout-button" key="3">
                    <Icon type="logout" /> Sign out
                  </Menu.Item>
                </Menu>
              }>
                <div className="header-button-trigger">
                  <Button size="large"><Icon type="user" /> {props.auth.email} <Icon type="down" /></Button>
                </div>
              </Dropdown>
            : <Link to="/login">
                <Button size="large" type="primary">Sign in</Button>
              </Link>
          }
        </Col>
      </Row>
    </Header>
  );

}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    signoutClick: () => dispatch(signout(props.history))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutHeader));
