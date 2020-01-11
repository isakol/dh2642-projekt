import React, { Component, useState} from "react";
import { connect } from "react-redux";
import { get_categories } from "../../redux/actions/categories";
import { Row, Col, Card, Progress, Skeleton, List } from "antd";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.cats.length == 0) {
      this.props.get_categories();
    }
  }

  render() {
    let totalAnswers = 0;
    let totalCorrect = 0;
    let favoriteCategories = [];
    let recentActivity = [];

    if (typeof this.props.profile.categories !== "undefined") {
      for (var k in this.props.profile.categories) {
        totalAnswers += this.props.profile.categories[k].answered;
        totalCorrect += this.props.profile.categories[k].correct;
        let findCategory = this.props.cats.find(cat => cat.id == k);
        if (findCategory != undefined)
          favoriteCategories.push({
            name: findCategory.name,
            times: this.props.profile.categories[k].times
          });
      }
      favoriteCategories.sort((a, b) => {
        return b.times - a.times;
      });

      if (typeof this.props.profile.history !== "undefined") {
        for (var k in this.props.profile.history) {
          let findCategory = this.props.cats.find(
            cat => cat.id == this.props.profile.history[k].id
          );
          if (findCategory != undefined) {
            recentActivity.push({
              name: findCategory.name,
              score: this.props.profile.history[k].score,
              difficulty: this.props.profile.history[k].difficulty,
              correct: this.props.profile.history[k].correct,
              answered: this.props.profile.history[k].answered,
              timestamp: this.props.profile.history[k].timestamp
            });
          }
        }
      }
    }

    return (
      <React.Fragment>
        <Card><div>Welcome home, {this.props.auth.displayName !== "undefined" && this.props.auth.displayName !== "" ?(this.props.auth.displayName) : (<p>user</p>)}!</div></Card>
        <Row gutter={30}>
          <Col span={8}>
            <Card title="Correct answers">
              {this.props.categoryStatus == "success" &&
              this.props.profile.isLoaded ? (
                typeof this.props.profile.categories !== "undefined" ? (
                  <React.Fragment>
                    <Progress
                      type="dashboard"
                      strokeColor="#1890ff"
                      strokeWidth={8}
                      percent={Math.round((+totalCorrect / totalAnswers) * 100)}
                    />
                    <div>
                      {totalCorrect}/{totalAnswers} (
                      {Math.round((+totalCorrect / totalAnswers) * 100) + "%"})
                      {((totalCorrect/totalAnswers) >= 0.75) ? (<div>
                        Well done!</div>
                        ) : ((totalCorrect/totalAnswers) >= 0.5) ?(<div>
                          You are well on your way to good scores!</div>
                        ) : ((totalCorrect/totalAnswers) >= 0.25) ?(<div>
                          Perhaps you should pick easier difficulties before you feel more confident?</div>
                        ) : (<div>
                          Ouch! We don't know what we should recommend you. Going back to school perhaps?
                          </div>)}
                    </div>
                  </React.Fragment>
                ) : (
                  "You have not played any quiz yet"
                )
              ) : (
                <Skeleton active />
              )}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Your favorite categories">
              {this.props.categoryStatus == "success" &&
              this.props.profile.isLoaded ? (
                typeof this.props.profile.categories != "undefined" ? (
                  <React.Fragment>
                    {favoriteCategories.map((c, i) => {
                      return (
                        <Row key={i}>
                          <Col className="favorite-left" span={21}>
                            {c.name}
                          </Col>
                          
                        </Row>
                      );
                    })}
                    <div id="favoritePlease">Play your less frequent category picks for a score boost!</div>
                  </React.Fragment>
                ) : (
                  "You have not played any quiz yet"
                )
              ) : (
                <Skeleton active />
              )}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Recent activity">
              {this.props.categoryStatus == "success" &&
              this.props.profile.isLoaded ? (
                typeof this.props.profile.history != "undefined" ? (
                  <List>
                    {[...recentActivity].reverse().map((c, i) => {
                      const activityDate = new Date(c.timestamp);
                      return (
                        <List.Item>
                          <div className="activity-time">
                            <div>{activityDate.toLocaleDateString()}</div>
                            <div>
                              {activityDate.getHours() +
                                ":" +
                                activityDate.getMinutes()}
                            </div>
                          </div>
                          <List.Item.Meta
                            title={c.name + " (" + c.difficulty + ")"}
                            description={
                              <span>
                                {c.correct +
                                  "/" +
                                  c.answered +
                                  " (" +
                                  Math.round((100 * c.correct) / c.answered) +
                                  "%) "}
                                <span className="activity-score">
                                  +{c.score}
                                </span>
                              </span>
                            }
                          />
                        </List.Item>
                      );
                    })}
                  </List>
                ) : (
                  "You have not played any quiz yet"
                )
              ) : (
                <Skeleton active />
              )}
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.firebaseReducer.profile,
    auth: state.firebaseReducer.auth,
    cats: state.categoryReducer.categories,
    categoryStatus: state.categoryReducer.status,
    categoryMessage: state.categoryReducer.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    get_categories: () => dispatch(get_categories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
