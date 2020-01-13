import React, { useEffect } from "react";
import "./Leaderboards.css";
import { Row, Col, Card, Skeleton, Alert } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { getCategories } from "../../redux/actions/categories";

const mapStateToProps = state => {
  return {
    top10: state.firebaseReducer.ordered.top10,
    topOfCats: state.firebaseReducer.ordered.topOfCats,
    auth: state.firebaseReducer.auth,
    profile: state.firebaseReducer.profile,
    cats: state.categoryReducer.categories,
    categoryStatus: state.categoryReducer.status,
    categoryMessage: state.categoryReducer.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(getCategories())
  };
};

const enhance = compose(
  firebaseConnect(props => [
    {
      path: "users",
      storeAs: "top10",
      queryParams: ["orderByChild=points", "limitToLast=15"]
    },
    {
      path: "leaderboards",
      storeAs: "topOfCats"
    }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
);

const Leaderboards = props => {
  let leaderboardObj = {};

  //if categories has not been loaded yet from the API this session, do it
  useEffect(() => {
    if (!props.cats.length > 0) props.getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //turn result object from firebase into an array that we can map
  if (typeof props.topOfCats !== "undefined") {
    Object.keys(props.topOfCats).forEach((k, i) => {
      let currentId = props.topOfCats[k].value.id;
      if (typeof leaderboardObj[currentId] === "undefined") {
        leaderboardObj[currentId] = [
          { points: props.topOfCats[k].value.points, displayName: props.topOfCats[k].value.displayName, uid: props.topOfCats[k].value.uid }
        ];
      } else {
        leaderboardObj[currentId].push({
          points: props.topOfCats[k].value.points,
          displayName: props.topOfCats[k].value.displayName,
          uid: props.topOfCats[k].value.uid
        });
      }
    });
  }

  return (
    <Row gutter={20}>
      {props.categoryStatus === "error" && <Alert type="error" message={props.categoryMessage} />}

      <Col xs={24} md={12} lg={8} xl={6}>
        <Card className="top10" title=" Top 15 players of all time">
          <div className="leaderboard-card-body">
            {!isLoaded(props.top10) ? (
              <Skeleton active />
            ) : !isEmpty(props.top10) ? (
              [...props.top10].reverse().map((player, i) => {
                return (
                  <div className={player.key === props.auth.uid ? "a-player you" : "a-player"} key={i}>
                    <div className="player-no">{i + 1}.</div>
                    <div className="player-name">
                      {"displayName" in player.value ? player.value.displayName : player.key}
                      {player.key === props.auth.uid && " (you)"}
                      {i === 0 ? (
                        <span role="img" aria-label="gold">
                          {" "}
                          &#129351;
                        </span>
                      ) : i === 1 ? (
                        <span role="img" aria-label="silver">
                          {" "}
                          &#129352;
                        </span>
                      ) : i === 2 ? (
                        <span role="img" aria-label="bronze">
                          {" "}
                          &#129353;
                        </span>
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

      <Col className="leaderboard-right" xs={24} md={12} lg={16} xl={18}>
        <Row gutter={20}>
          {typeof props.topOfCats !== "undefined" && props.cats.length > 0 && props.categoryStatus === "success" && leaderboardObj !== {} ? (
            Object.keys(leaderboardObj).map((c, i) => {
              let findCategory = props.cats.find(cat => cat.id === parseInt(c));
              return (
                findCategory !== undefined && (
                  <Col key={i} xs={24} md={24} lg={12} xl={8}>
                    <Card className="category-card" title={findCategory.name} extra={<Link to={"/new-quiz/" + c}>Take quiz</Link>}>
                      <div className="leaderboard-card-body">
                        {leaderboardObj[c]
                          .sort((a, b) => b.points - a.points)
                          .map((p, j) => {
                            return (
                              <div key={j} className={p.uid === props.auth.uid ? "a-player you" : "a-player"}>
                                <div className="player-no">{j + 1}.</div>
                                <div className="player-name">
                                  {p.displayName}
                                  {p.uid === props.auth.uid && " (you)"}
                                  {j === 0 ? (
                                    <span role="img" aria-label="gold">
                                      {" "}
                                      &#129351;
                                    </span>
                                  ) : j === 1 ? (
                                    <span role="img" aria-label="silver">
                                      {" "}
                                      &#129352;
                                    </span>
                                  ) : j === 2 ? (
                                    <span role="img" aria-label="bronze">
                                      {" "}
                                      &#129353;
                                    </span>
                                  ) : null}
                                </div>
                                <div>{p.points}</div>
                              </div>
                            );
                          })}
                      </div>
                    </Card>
                  </Col>
                )
              );
            })
          ) : (
            <React.Fragment>
              <Col xs={24} md={24} lg={12} xl={8}>
                <Card>
                  <Skeleton active />
                </Card>
              </Col>
              <Col xs={24} md={24} lg={12} xl={8}>
                <Card>
                  <Skeleton active />
                </Card>
              </Col>
              <Col xs={24} md={24} lg={12} xl={8}>
                <Card>
                  <Skeleton active />
                </Card>
              </Col>
            </React.Fragment>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default enhance(Leaderboards);
