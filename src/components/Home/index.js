import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categories";
import { Row, Col, Alert, Card, Progress, Skeleton, List } from "antd";
import "./Home.css";

class Home extends Component {

  componentDidMount() {
    if (this.props.cats.length === 0) {
      this.props.getCategories();
    }
  }

  render() {
    let totalAnswers = 0;
    let totalCorrect = 0;
    let favoriteCategories = [];
    let recentActivity = [];

    if (typeof this.props.profile.categories !== "undefined") {
      for (let k in this.props.profile.categories) {
        totalAnswers += this.props.profile.categories[k].answered;
        totalCorrect += this.props.profile.categories[k].correct;
        let findCategory = this.props.cats.find(cat => cat.id === parseInt(k));
        if (findCategory !== undefined)
          favoriteCategories.push({
            name: findCategory.name,
            times: this.props.profile.categories[k].times
          });
      }
      favoriteCategories.sort((a, b) => {
        return b.times - a.times;
      });

      if (typeof this.props.profile.history !== "undefined") {
        for (let k in this.props.profile.history) {
          let findCategory = this.props.cats.find(
            cat => cat.id === parseInt(this.props.profile.history[k].id)
          );
          if (findCategory !== undefined) {
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
        {this.props.categoryStatus === "error" && <Alert type="error" message="Could not contact the API, please try again later." />}
        <Card className="home-name-header"><div>Welcome home, {this.props.profile.displayName !== "undefined" && this.props.profile.displayName !== null ?(this.props.profile.displayName) : "user"}!</div></Card>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Card className="home-card" title="Correct answers">
              {this.props.categoryStatus === "success" &&
              this.props.profile.isLoaded ? (
                typeof this.props.profile.categories !== "undefined" ? (
                  <React.Fragment>
                    <Progress
                      type="dashboard"
                      strokeColor="#1890ff"
                      strokeWidth={8}
                      percent={Math.round((+totalCorrect / totalAnswers) * 100)}
                    />
                    <div className="total-numbers">
                      {totalCorrect}/{totalAnswers} ({Math.round((+totalCorrect / totalAnswers) * 100) + "%"})
                    </div>
                    <div className="card-footer">
                      {((totalCorrect/totalAnswers) >= 0.75) ? (
                        "Well done!"
                        ) : ((totalCorrect/totalAnswers) >= 0.5) ?(
                          "You are well on your way to good scores!"
                        ) : ((totalCorrect/totalAnswers) >= 0.25) ?("Perhaps you should pick easier difficulties before you feel more confident?"
                      ) : ("Ouch! We don't know what we should recommend you. Going back to school perhaps?")}
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
          <Col xs={24} md={12} lg={8}>
            <Card className="home-card" title="Your favorite categories">
              {this.props.categoryStatus === "success" &&
              this.props.profile.isLoaded ? (
                typeof this.props.profile.categories !== "undefined" ? (
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
                    <div className="card-footer">Play your less frequently played category picks for a score boost!</div>
                  </React.Fragment>
                ) : (
                  "You have not played any quiz yet"
                )
              ) : (
                <Skeleton active />
              )}
            </Card>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Card className="home-card" title="Recent activity">
              {this.props.categoryStatus === "success" &&
              this.props.profile.isLoaded ? (
                typeof this.props.profile.history !== "undefined" ? (
                  <List>
                    {[...recentActivity].reverse().map((c, i) => {
                      const activityDate = new Date(c.timestamp);
                      return (
                        <List.Item key={i}>
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
    cats: state.categoryReducer.categories,
    categoryStatus: state.categoryReducer.status,
    categoryMessage: state.categoryReducer.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(getCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
