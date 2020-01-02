import React, { Component } from "react";
import { connect } from "react-redux";
import { get_categories } from "../../redux/actions/categories";
import { Row, Col, Card, Progress, Skeleton } from "antd";
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
    }

    return (
      <React.Fragment>
        <div>Welcome home.</div>
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
                          <Col className="favorite-right" span={3}>
                            {c.times}
                          </Col>
                        </Row>
                      );
                    })}
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
            <Card title="Recent activity"></Card>
          </Col>
        </Row>
        {}
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
    get_categories: () => dispatch(get_categories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
