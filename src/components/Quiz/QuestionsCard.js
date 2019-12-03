import React, {Component} from "react";
import { Card, Row, Col, Button, Progress } from "antd";

function shuffle(arr) {
    var counter = arr.length, temp, index;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.alternatives = props.question.incorrect_answers;
    this.alternatives.push(props.question.correct_answer);
    this.alternatives = shuffle(this.alternatives);
  }
  render() {
    return (
      <Card className="quiz-card" title="Question 1/10">
        <div className="question-body">
          <p className="the-question">{this.props.question.question}</p>
          <div>
          <div className="question-seconds">{Math.ceil(this.props.timeLeft/1000)} seconds left</div>
          <Progress className="question-progress" percent={100-((this.props.timeLeft)/10000*100)} showInfo={false} status="active" strokeWidth={24} />
          </div>
        </div>
        <div className="quiz-card-footer">
          <Row className="quiz-answers-first">
            {
              this.alternatives.slice(0,2).map((ans, i) => {
                return (
                  <Col span={12} key={i}><Button value={ans} onClick={e => this.props.answerClick(e.target.value)}type="default" block>{ans}</Button></Col>
                );
              })
            }
          </Row>
          <Row className="quiz-answers-second">
          {
            this.alternatives.slice(2,4).map((ans, i) => {
              return (
                <Col span={12} key={i}><Button value={ans} onClick={e => this.props.answerClick(e.target.value)} type="default" block>{ans}</Button></Col>
              );
            })
          }
          </Row>
        </div>
      </Card>
    );
  }
}

export default QuestionCard;
