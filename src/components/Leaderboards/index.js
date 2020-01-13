import React, { useEffect } from "react";
import "./Leaderboards.css";
import { Row, Col, Card, Skeleton, Alert } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { get_categories } from "../../redux/actions/categories";

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
    get_categories: () => dispatch(get_categories())
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
  console.log(props.topOfCats);
  let transArr = [];
  const topArr = [];
  if(typeof props.topOfCats != "undefined"){
    let keys = Object.keys(props.topOfCats);
    let n = keys.length;
    for(let i = 0; i<n; i++){
      let key = keys[i];
      transArr[key] = props.topOfCats[key];
    }
    topArr = transArr.reduce((acc, curr) => {
      if(!acc[curr.id]) acc[curr.id] = []; //If this type wasn't previously stored
      acc[curr.id].push(curr);
      return acc;
    },{});
    console.log(topArr);
  }
  //if categories has not been loaded yet from the API this session, do it
  useEffect(() => {
    if (!props.cats.length > 0) props.get_categories();
  }, []);

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
                      {i == 0 ? <span> &#129351;</span> : i == 1 ? <span> &#129352;</span> : i == 2 ? <span> &#129353;</span> : null}
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
          {typeof props.topOfCats !== "undefined" && props.cats.length > 0 && props.categoryStatus === "success" ? (
            topArr.map((c, i) => {
              let findCategory = props.cats.find(cat => cat.id == c.id);
              return typeof findCategory !== null ? (
                <Col key={i} xs={24} md={24} lg={12} xl={8}>
                  <Card className="category-card" title={findCategory.name} extra={<Link to={"/new-quiz/" + c.id}>Take quiz</Link>}>
                    <div className="leaderboard-card-body">
                      {Object.keys(c.value)
                        .sort((a, b) => c.value[b].points - c.value[a].points)
                        .map((p, j) => {
                          return (
                            <div className={c.value[p].uid === props.auth.uid ? "a-player you" : "a-player"} key={j}>
                              <div className="player-no">{j + 1}.</div>
                              <div className="player-name">
                                {c.value[p].displayName}
                                {c.value[p].uid === props.auth.uid && " (you)"}
                                {j == 0 ? <span> &#129351;</span> : j == 1 ? <span> &#129352;</span> : j == 2 ? <span> &#129353;</span> : null}
                              </div>
                              <div>{c.value[p].points}</div>
                            </div>
                          );
                        })}
                    </div>
                  </Card>
                </Col>
              ) : null;
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
