import React, {Component} from "react";
import {Card, Row, Col, Button, Progress } from "antd";
import he from "he";


class QuestionCard extends Component {

  render() {

    return (
      <Card className="quiz-card" title={"Question "+(this.props.questionNo+1)+"/10"}>
        <div className="question-body">
          <div className="the-question">
          {
            this.props.correctOrIncorrect != null ?
              this.props.correctOrIncorrect.correct ?
                  <div>
                    <div className="question-correct">Correct</div>
                  </div>
                :
                  <div>
                    <div className="question-incorrect">Incorrect</div>
                    <div>The correct answer was: <span className="correct-answer">{he.decode(this.props.correctOrIncorrect.correct_answer)}</span></div>
                  </div>
            :
              he.decode(this.props.questionText)
            }
          </div>
          <div>
          <div className="question-seconds">{Math.ceil(this.props.timeLeft/1000)} seconds left</div>
          <Progress className="question-progress" percent={100-((this.props.timeLeft)/10000*100)} showInfo={false} status="active" strokeWidth={24} />
          </div>
        </div>

        <div className="quiz-card-footer">
          <Row className="quiz-answers-first">
            {
              this.props.alternatives.slice(0,2).map((ans, i) => {
                return (
                  <Col span={12} key={i}><Button value={ans} onClick={e => this.props.answerClick(e.target.value)}type="default" block>{he.decode(ans)}</Button></Col>
                );
              })
            }
          </Row>
          <Row className="quiz-answers-second">
          {
            this.props.alternatives.slice(2,4).map((ans, i) => {
              return (
                <Col span={12} key={i}><Button value={ans} onClick={e => this.props.answerClick(e.target.value)} type="default" block>{he.decode(ans)}</Button></Col>
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
