import React from "react";
import {message, Card, Col, Row, Button} from "antd";


const QuizStart = (props) => {
  if (props.status == "error") {
    message.error(this.props.message);
  }
  return (
    <Card className="start-quiz-card">
      <h1>{props.name}</h1>
      <div className="start-quiz-difficulty">Difficulty: <b>{props.difficulty}</b></div>
      <div className="start-quiz-timelimit">Time per question: <b>10s</b></div>
      <Button type="primary" shape="round" block loading={props.status != "success"} onClick={props.startClick}>Start quiz</Button>
    </Card>
  );
};

export default QuizStart;
