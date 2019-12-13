import React from "react";
import "./Leaderboards.css";
import {Row, Col, Card} from "antd";
import {Link} from "react-router-dom";

const top10 = [
    {"name": "player 1", "points": 10000},
    {"name": "player 2", "points": 9000},
    {"name": "player 3", "points": 8000},
    {"name": "player 4", "points": 7000},
    {"name": "player 5", "points": 6000},
    {"name": "player 6", "points": 5000},
    {"name": "player 7", "points": 4000},
    {"name": "player 8", "points": 3000},
    {"name": "player 9", "points": 2000},
    {"name": "player 10", "points": 1000}
];

const cats = [
  {
    "id": 2,
    "name": "Music",
    "players":
    [
      {"name":"music player 1", "points": 5300},
      {"name":"musicc 2", "points": 1903}
    ]
  },
  {
    "id": 3,
    "name": "General knowledge",
    "players":
    [
      {"name":"quizmaster", "points": 7777},
      {"name":"general", "points": 6666}
    ]
  }
]

const Leaderboards = () => {
  return (
    <Row gutter={15}>
      <Col xs={24} md={12} lg={8} xl={6}>
        <Card className="top10" title=" Top 10 players all time">
          <div className="leaderboard-card-body">
            {
              top10.map((player, i) => {
                return (
                  <div className="a-player" key={i}>
                    <div className="player-no">{i+1}.</div>
                    <div className="player-name">{player.name} {i==0 ? <span>&#129351;</span> : (i==1) ? <span>&#129352;</span> : (i==2) ? <span>&#129353;</span> : null}</div>
                    <div>{player.points}</div>
                  </div>
                );
              })
            }
          </div>
        </Card>
      </Col>
      {
        cats.map((cat, i) => {
          return (
            <Col key={i} xs={24} md={12} lg={8} xl={6}>
              <Card title={cat.name} extra={<Link to={"/new-quiz/"+cat.id}>Take quiz</Link>}>
                <div className="leaderboard-card-body">
                  {
                    cat.players.map((player, i) => {
                      return (
                        <div className="a-player" key={i}>
                          <div className="player-no">{i+1}.</div>
                          <div className="player-name">{player.name} {i==0 ? <span>&#129351;</span> : (i==1) ? <span>&#129352;</span> : (i==2) ? <span>&#129353;</span> : null}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </Card>
            </Col>
          )
        })
      }
    </Row>
  );
}

export default Leaderboards;
