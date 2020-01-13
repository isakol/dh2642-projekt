import React from "react";
import "./Leaderboards.css";
import { Row, Col, Card, Spin } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";


const cats = [{id: 9, name: "General Knowledge"},{id: 10, name: "Entertainment: Books"},{id: 11, name: "Entertainment: Film"},
{id: 12, name: "Entertainment: Music"},{id: 13, name: "Entertainment: Musicals & Theatres"},{id: 14, name: "Entertainment: Television"},
{id: 15, name: "Entertainment: Video Games"},{id: 16, name: "Entertainment: Board Games"},{id: 17, name: "Science & Nature"},
{id: 18, name: "Science: Computers"},{id: 19, name: "Science: Mathematics"},{id: 20, name: "Mythology"},{id: 21, name: "Sports"},
{id: 22, name: "Geography"},{id: 23, name: "History"},{id: 24, name: "Politics"},{id: 25, name: "Art"},{id: 26, name: "Celebrities"},
{id: 27, name: "Animals"},{id: 28, name: "Vehicles"},{id: 29, name: "Entertainment: Comics"},{id: 30, name: "Science: Gadgets"},
{id: 31, name: "Entertainment: Japanese Anime & Manga"},{id: 32, name: "Entertainment: Cartoon & Animations"}];
  

const enhance = compose(
  firebaseConnect(props => [
    {
      path: "users",
      storeAs: "top10",
      queryParams: ["orderByChild=points", "limitToLast=10"]
    },
    {
      path: "leaderboards",
      storeAs: "topOfCats",
      queryParams: ["orderByValue"]
    }
  ]),
  connect(state => ({
    top10: state.firebaseReducer.ordered.top10,
    topOfCats: state.firebaseReducer.ordered.topOfCats,
    profile: state.firebaseReducer.profile
  }))
);

const Leaderboards = props => {
  return (
    <Row gutter={15}>
      <Col xs={24} md={12} lg={8} xl={6}>
        <Card className="top10" title=" Top 10 players of all time">
          <div className="leaderboard-card-body">
            {!isLoaded(props.top10) ? (
              <Spin />
            ) : !isEmpty(props.top10) ? (
              [...props.top10].reverse().map((player, i) => {
                return (
                  <div className={"displayName" in player.value && player.value.displayName == props.profile.displayName ? "a-player you" : "a-player"} key={i}>
                    <div className="player-no">{i + 1}.</div>
                    <div className="player-name">
                      {"displayName" in player.value && player.value.displayName == props.profile.displayName
                        ? (player.value.displayName + " (you)")
                        : "displayName" in player.value ? player.value.displayName
                        : player.key}
                      {i == 0 ? (
                        <span> &#129351;</span>
                      ) : i == 1 ? (
                        <span> &#129352;</span>
                      ) : i == 2 ? (
                        <span> &#129353;</span>
                      ) : null}
                    </div>
                    <div>{player.value.points}</div>
                  </div>
                );
              })
            ) : (
              <div>No scores to show</div>
            )}
          </div>
        </Card>
      </Col>
      {cats.map((cat, i) => {
        return (
          <Col key={i} xs={24} md={12} lg={8} xl={6}>
            <Card
              title={cat.name}
              extra={<Link to={"/new-quiz/" + cat.id}>Take quiz</Link>}
            >
              <div className="leaderboard-card-body">
                {!isLoaded(props.topOfCats) ? (
                  <Spin />
                ) : !isEmpty(props.topOfCats) ? (
                  [...props.topOfCats].find(e => e.value == cat.id).map((player, i) => {
                //cat.players.map((player, i) => {
                  return (
                    <div className="a-player" key={i}>
                      <div className="player-no">{i + 1}.</div>
                      <div className="player-name">
                        {player.value.Object.key.displayName}
                        {i == 0 ? (
                          <span> &#129351;</span>
                        ) : i == 1 ? (
                          <span> &#129352;</span>
                        ) : i == 2 ? (
                          <span> &#129353;</span>
                        ) : null}
                      </div>
                    </div>
                  );
                })
              ): null}
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default enhance(Leaderboards);
