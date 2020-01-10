import React from "react";
import { Layout, Col, Row, Button, Dropdown, Menu, Icon, Tag } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signout } from "../../redux/actions/auth";
import { withRouter } from "react-router-dom";
import "./Header.css";

const { Header } = Layout;

const LayoutHeader = props => {
  return (
    <Header>
      <Row type="flex" justify="space-between">
        <Col className="header-start">
          <span className="logo">
            <Link to="/">Quiz App</Link>
          </span>
          <span className="start-button">
            <Link to="/new-quiz">
              <Button type="primary" shape="round" size="large">
                Start quiz
              </Button>
            </Link>
          </span>
          <span className="leaderboard-button">
            <Link to="/leaderboards">Leaderboards</Link>
          </span>
        </Col>
        <Col className="large-and-up">
          {!props.auth.isLoaded ? (
            ""
          ) : !props.auth.isEmpty ? (
            <React.Fragment>
              {!props.profile.isLoaded ? (
                ""
              ) : !props.profile.isEmpty ? (
                <Tag color="#87d068">{props.profile.points} points</Tag>
              ) : null}
              <Dropdown
                trigger={["click"]}
                overlay={
                  <Menu className="dropdown-menu">
                    <Menu.Item key="2">
                      <Link to="/settings">
                        <Icon type="setting" />
                        Settings
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      onClick={props.signoutClick}
                      className="logout-button"
                      key="3"
                    >
                      <Icon type="logout" /> Sign out
                    </Menu.Item>
                  </Menu>
                }
              >
                <span className="header-button-trigger">
                  <Button size="large">
                    <Icon type="user" />{" "}
                    {props.auth.displayName != null
                      ? props.auth.displayName
                      : props.auth.email}{" "}
                    <Icon type="down" />
                  </Button>
                </span>
              </Dropdown>
            </React.Fragment>
          ) : (
            <Link to="/login">
              <Button size="large" type="primary">
                Sign in
              </Button>
            </Link>
          )}
        </Col>
        <Col className="medium-and-down">
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu className="mobile-dropdown-menu">
                <Menu.Item key="1">
                  <Link to="/new-quiz">Start quiz</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/leaderboards">Leaderboard</Link>
                </Menu.Item>
                <Menu.Divider />
                {!props.auth.isLoaded ? (
                  ""
                ) : !props.auth.isEmpty ? (
                  <React.Fragment>
                    <Menu.Item key="3">
                      <Link to="/settings">Settings</Link>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={props.signoutClick}>
                      Sign out
                    </Menu.Item>
                  </React.Fragment>
                ) : (
                  <Menu.Item key="3">
                    <Link to="/login">Login</Link>
                  </Menu.Item>
                )}
              </Menu>
            }
          >
            <span className="mobile-button-trigger">
              <Button size="large">&#9776;</Button>
            </span>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
    profile: state.firebaseReducer.profile
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    signoutClick: () => dispatch(signout(props.history))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LayoutHeader)
);
