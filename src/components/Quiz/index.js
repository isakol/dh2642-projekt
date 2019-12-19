import React, {Component} from "react";
import QuestionsCard from "./QuestionsCard";
import QuizBreakdown from "./QuizBreakdown";
import QuizStart from "./QuizStart";
import {message, Spin} from "antd";
import "./Quiz.css";
import {connect} from "react-redux";
import {get_categories} from "../../redux/actions/categories";
import {updateScore, updateCategoryPreferences} from "../../redux/actions/userData";

const error = (msg) => {
  message.error(msg);
};

class Quiz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      started:false,
      paused:false,
      finished:false,
      timeLeft: 10000,
      message: "",
      questions: [],
      status: "loading",
      questionNo: 0,
      answers: [],
      correctOrIncorrect: null
    }
    this.startClick = this.startClick.bind(this);
    this.answer = this.answer.bind(this);
  }

  startClick() {
    if (this.state.status == "success") {
      this.setState({started: true});
      this.interval = setInterval(() => {
        if (!this.state.paused) {
          let currentTimeLeft = this.state.timeLeft-200;
          this.setState({timeLeft: currentTimeLeft});
          if (currentTimeLeft <= 0) {
            this.answer("");
          }
        }
      }, 200);
    }
  }
  answer(answer) {
    if (!this.state.paused) {
    this.setState(
      {
        paused: true,
        answers: this.state.answers.concat({
          question: this.state.questions[this.state.questionNo].question,
          answer: answer,
          correct_answer: this.state.questions[this.state.questionNo].correct_answer,
        }),
        correctOrIncorrect:
        {
          correct: (this.state.questions[this.state.questionNo].correct_answer == answer),
          correct_answer: (this.state.questions[this.state.questionNo].correct_answer),
        }
      }
    );
      if (this.state.questionNo >= 9) {
        clearInterval(this.interval);
        setTimeout(() => {
          const score = 1000;

          this.setState({finished:true});
          this.props.updateScore(score);
          this.props.updateCategoryPreferences(this.props.match.params.id, score);
        }, 2000);
      } else {
      setTimeout(() => {
        this.setState({
          paused: false,
          timeLeft:10000,
          questionNo:this.state.questionNo+1,
          correctOrIncorrect: null
        })
      }, 2000);
    }
  }
  }
  componentDidMount() {


    const noOfQuestions = 10;
    let reqString = "https://opentdb.com/api.php?amount=";
    reqString += noOfQuestions + "&category=";
    reqString += this.props.match.params.id + "&difficulty=";
    reqString += this.props.match.params.difficulty + "&type=multiple";
    this.setState({status: "loading"})
    fetch(reqString, {method:"GET"})
    .then(response => {
      if (response.ok) {
        response.json().then(questions => {
          questions.results.map(q => {
            q.alternatives = q.incorrect_answers;
            q.alternatives.push(q.correct_answer);
            //shuffle the alternatives
            q.alternatives =
            q.alternatives
              .map((a) => ({sort: Math.random(), value: a}))
              .sort((a, b) => a.sort - b.sort)
              .map((a) => a.value);
            delete q.incorrect_answers;
          });
          this.setState({status: "success", questions: questions.results});
        });
      } else {
        this.setState({status: "error", message: "Could not load the quiz. Please try again later."})
      }
    })
    .catch(() => {
        this.setState({status: "error", message: "Could not load the quiz. Please try again later."})
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
      content = <div className="difficulty-status"><Spin size="large" /></div>
    } else if (this.props.categoriesStatus == "success") {
      let findCategory = this.props.cats.find(cat => cat.id == this.props.match.params.id);

      if (typeof findCategory === "undefined") {
        content = <div className="quiz-status">The requested category does not exist.</div>
      } else {
        if (this.state.started) {
          if (this.state.finished) {
            content =
            <QuizBreakdown
              answers={this.state.answers}
            />
          } else {
            content =
            <QuestionsCard
              questionNo={this.state.questionNo}
              questionText={this.state.questions[this.state.questionNo].question}
              alternatives={this.state.questions[this.state.questionNo].alternatives}
              timeLeft={this.state.timeLeft}
              answerClick={this.answer}
              correctOrIncorrect={this.state.correctOrIncorrect}
            />
          }
        } else {
          content =
          <QuizStart
            status={this.state.status}
            difficulty={this.props.match.params.difficulty}
            name={findCategory.name}
            message={this.state.message}
            startClick={this.startClick}
          />
        }
      }

    } else {
      content = <div className="quiz-status">{this.props.categoriesMessage}</div>
    }
      return (<React.Fragment>{content}</React.Fragment>);
  }
}

function mapStateToProps(state) {
  return {
    cats: state.categoryReducer.categories,
    categoriesStatus: state.categoryReducer.status,
    categoriesMessage: state.categoryReducer.message
  }
}

function mapDispatchToProps(dispatch) {
  return {
    get_categories: () => dispatch(get_categories()),
    updateScore: (score) => dispatch(updateScore(score)),
    updateCategoryPreferences: (categoryId, score) => dispatch(updateCategoryPreferences(categoryId, score))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
