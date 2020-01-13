import React from "react";
import {Row, Col, Card} from "antd";
import "./Landing.css"

const cardLayout = {xs: 24, sm: 12, md: 8};

const Landing = () => {
  return (
    <React.Fragment>
      <section className="landing-header">
        <h1>Welcome to QUIZ APP NAME HERE</h1>
        <p>A web based application where you can test your knowledge.</p>
      </section>
      <section className="landing-section-1">
        <Row gutter={50}>
          <Col {...cardLayout}>
            <Card>
              <span className="landing-icon" role="img" aria-label="geek">&#x1f913;</span>
              <h2>Become wiser</h2>
              <p>By applying gamification to gaining knowledge you will get wiser and have fun at the same time.</p>
            </Card>
          </Col>
          <Col {...cardLayout}>
            <Card>
              <span className="landing-icon" role="img" aria-label="alien monster">&#128126;</span>
              <h2>Big variety of categories</h2>
              <p>We have over 20 categories to choose from so that you can be sure to find a category that interests you.</p>
            </Card>
          </Col>
          <Col {...cardLayout}>
            <Card>
              <span className="landing-icon" role="img" aria-label="trophy">&#127942;</span>
              <h2>Compete with friends</h2>
              <p>Earn points for answering correctly. Stack them up to climb the leaderboard.</p>
            </Card>
          </Col>
        </Row>
      </section>
    </React.Fragment>
  );
}

export default Landing;
