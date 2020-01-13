import React, { Component } from "react";
import QuestionsCard from "./QuestionsCard";
import QuizBreakdown from "./QuizBreakdown";
import QuizStart from "./QuizStart";
import { Spin } from "antd";
import "./Quiz.css";
import { connect } from "react-redux";
import { get_categories } from "../../redux/actions/categories";
import { withFirebase } from "react-redux-firebase";

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      started: false,
      paused: false,
      finished: false,
      timeLeft: 10000,
      message: "",
      questions: [],
      status: "loading",
      questionNo: 0,
      answers: [],
      score: 0,
      correctOrIncorrect: null
    };
    this.startClick = this.startClick.bind(this);
    this.answer = this.answer.bind(this);
  }

  startClick() {
    if (this.state.status == "success") {
      this.setState({ started: true });
      this.interval = setInterval(() => {
        if (!this.state.paused) {
          let currentTimeLeft = this.state.timeLeft - 100;
          this.setState({ timeLeft: currentTimeLeft });
          if (currentTimeLeft <= 0) {
            this.answer("");
          }
        }
      }, 100);
    }
  }
  answer(answer) {
    if (!this.state.paused) {
      this.setState({
        paused: true,
        answers: this.state.answers.concat({
          question: this.state.questions[this.state.questionNo].question,
          answer: answer,
          correct_answer: this.state.questions[this.state.questionNo].correct_answer,
          timeLeft: this.state.timeLeft
        }),
        correctOrIncorrect: {
          correct: this.state.questions[this.state.questionNo].correct_answer == answer,
          correct_answer: this.state.questions[this.state.questionNo].correct_answer
        }
      });
      if (this.state.questionNo >= 9) {
        clearInterval(this.interval);
        setTimeout(() => {
          this.setState({ finished: true });
          let points = 0;
          let time = 0;
          let weighting = 1;

          if (typeof this.props.profile.categoryPreferences !== "undefined") {
            let catPref = this.props.profile.categoryPreferences;

            let mostPlayedCat = Object.keys(catPref).reduce((max, cat) => (max.times > cat.times ? max : cat));

            if (mostPlayedCat !== this.props.match.params.id) {
              let thisCatTimes = typeof catPref[this.props.match.params.id] !== "undefined" ? catPref[this.props.match.params.id].times : 0;
              weighting = weighting * this.calculateCategoryScaling(catPref[mostPlayedCat].times, thisCatTimes);
            }
          }

          if (this.props.match.params.difficulty === "medium") {
            weighting = weighting * 1.25;
          } else if (this.props.match.params.difficulty === "hard") {
            weighting = weighting * 1.5;
          }

          this.state.answers.forEach(question => {
            if (question.answer == question.correct_answer) {
              points = points + 10;
              time = time + question.timeLeft;
            }
          });
          if (points == 100) {
            points += 50;
          }
          points = Math.round((points + time / 100) * weighting);
          const noOfCorrectAnswers = this.state.answers.filter(a => a.answer == a.correct_answer).length;
          let oldPoints = 0;
          this.setState({ score: points, finished: true }, () => {
            //update users points and add user stats for played category
            this.props.firebase
              .updateProfile({
                points: this.props.profile.points + points,
                categories: {
                  ...this.props.profile.categories,
                  [this.props.match.params.id]:
                    typeof this.props.profile.categories[this.props.match.params.id] !== "undefined"
                      ? {
                          answered: this.props.profile.categories[this.props.match.params.id].answered + this.state.answers.length,
                          correct: this.props.profile.categories[this.props.match.params.id].correct + noOfCorrectAnswers,
                          points: this.props.profile.categories[this.props.match.params.id].points + points,
                          times: this.props.profile.categories[this.props.match.params.id].times + 1
                        }
                      : {
                          answered: this.state.answers.length,
                          correct: noOfCorrectAnswers,
                          points: points,
                          times: 1
                        }
                }
              })
              .then(() => {
                //add score to leaderboards
                this.props.firebase
                .ref("leaderboards/categories")
                .child(this.props.match.params.id)
                .orderByChild("uid")
                .equalTo(this.props.auth.uid)
                .on("value", snapshot => {
                  console.log(snapshot.val());
                  snapshot.forEach( data => {
                    if(data.val().points > oldPoints){
                      oldPoints = data.val().points;
                      data.ref.remove();
                    }
                  });
                  //snapshot.ref.remove();
              });
            }).then(() =>{
                //if()
                this.props.firebase.push("leaderboards/categories/" + this.props.match.params.id, {
                  displayName: this.props.auth.displayName,
                  points: oldPoints + points,
                  uid: this.props.auth.uid
                });
              });
            //this.props.updateCategoryScore(this.props.match.params.id, points);

            //remove oldest activity if user already has 5 entries in history
            if (typeof this.props.profile.history !== "undefined" && Object.keys(this.props.profile.history).length >= 5) {
              this.props.firebase
                .ref("users/" + this.props.auth.uid)
                .child("history")
                .orderByChild("timestamp")
                .limitToFirst(1)
                .once("child_added", snapshot => {
                  snapshot.ref.remove();
                });
            }

            //push results to recent activity
            this.props.firebase.push("users/" + this.props.auth.uid + "/history", {
              answered: this.state.answers.length,
              correct: noOfCorrectAnswers,
              difficulty: this.props.match.params.difficulty,
              id: this.props.match.params.id,
              score: points,
              timestamp: this.props.firebase.database.ServerValue.TIMESTAMP
            });
          });
        }, 1750);
      } else {
        setTimeout(() => {
          this.setState({
            paused: false,
            timeLeft: 10000,
            questionNo: this.state.questionNo + 1,
            correctOrIncorrect: null
          });
        }, 1750);
      }
    }
  }

  calculateCategoryScaling(mostPlayedCatTimes, thisCatTimes) {
    let scaling = 1.0;
    if (thisCatTimes / mostPlayedCatTimes < 0.75) {
      scaling = 1.25;
    } else if (thisCatTimes / mostPlayedCatTimes < 0.5) {
      scaling = 1.5;
    } else if (thisCatTimes / mostPlayedCatTimes < 0.25) {
      scaling = 2.0;
    }
    return scaling;
  }

  componentDidMount() {
    const noOfQuestions = 10;
    let reqString = "https://opentdb.com/api.php?amount=";
    reqString += noOfQuestions + "&category=";
    reqString += this.props.match.params.id + "&difficulty=";
    reqString += this.props.match.params.difficulty; // + "&type=multiple";
    this.setState({ status: "loading" });
    fetch(reqString, { method: "GET" })
      .then(response => {
        if (response.ok) {
          response.json().then(questions => {
            if (questions.response_code == 0) {
              //shuffle questions
              for (let i = questions.results.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = questions.results[i];
                questions.results[i] = questions.results[j];
                questions.results[j] = temp;
              }
              questions.results.map(q => {
                q.alternatives = q.incorrect_answers;
                q.alternatives.push(q.correct_answer);
                //shuffle the alternatives
                q.alternatives = q.alternatives
                  .map(a => ({ sort: Math.random(), value: a }))
                  .sort((a, b) => a.sort - b.sort)
                  .map(a => a.value);
                delete q.incorrect_answers;
              });
              this.setState({
                status: "success",
                questions: questions.results
              });
            } else if (questions.response_code == 1) {
              this.setState({
                status: "error",
                message: "This quiz is under development and does not have enough questions right now."
              });
            } else {
              this.setState({
                status: "error",
                message: "An unknown error occured when loading the quiz."
              });
            }
          });
        } else {
          this.setState({
            status: "error",
            message: "Could not load the quiz. Please try again later."
          });
        }
      })
      .catch(() => {
        this.setState({
          status: "error",
          message: "Could not load the quiz. Please try again later."
        });
      });

    if (this.props.cats.length == 0) {
      this.props.get_categories();
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let content = "";
    if (this.props.categoriesStatus == "loading") {
      content = (
        <div className="difficulty-status">
          <Spin size="large" />
        </div>
      );
    } else if (this.props.categoriesStatus == "success") {
      let findCategory = this.props.cats.find(cat => cat.id == this.props.match.params.id);

      if (typeof findCategory === "undefined") {
        content = <div className="quiz-status">The requested category does not exist.</div>;
      } else {
        if (this.state.started) {
          if (this.state.finished) {
            content = <QuizBreakdown score={this.state.score} answers={this.state.answers} />;
          } else {
            content = (
              <QuestionsCard
                questionNo={this.state.questionNo}
                questionText={this.state.questions[this.state.questionNo].question}
                alternatives={this.state.questions[this.state.questionNo].alternatives}
                timeLeft={this.state.timeLeft}
                answerClick={this.answer}
                correctOrIncorrect={this.state.correctOrIncorrect}
              />
            );
          }
        } else {
          content = (
            <QuizStart
              status={this.state.status}
              id={this.props.match.params.id}
              difficulty={this.props.match.params.difficulty}
              name={findCategory.name}
              message={this.state.message}
              startClick={this.startClick}
            />
          );
        }
      }
    } else {
      content = <div className="quiz-status">{this.props.categoriesMessage}</div>;
    }
    return <React.Fragment>{content}</React.Fragment>;
  }
}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
    profile: state.firebaseReducer.profile,
    cats: state.categoryReducer.categories,
    categoriesStatus: state.categoryReducer.status,
    categoriesMessage: state.categoryReducer.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    get_categories: () => dispatch(get_categories())
  };
}

export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(Quiz));
