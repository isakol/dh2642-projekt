import React from "react";
import { Card, Button, Icon } from "antd";
import { Link } from "react-router-dom";

const QuizStart = props => {
  return (
    <Card className="start-quiz-card">
      <h1>{props.name}</h1>
      <div className="start-quiz-difficulty">
        Difficulty: <b>{props.difficulty}</b>
      </div>
      <div className="start-quiz-timelimit">
        Time per question: <b>10s</b>
      </div>
      {props.status === "error" ? (
        <React.Fragment>
          <div className="start-quiz-error">{props.message}</div>
          <Link to={"/new-quiz/" + props.id}>
            <Button size="large">
              <Icon type="left" /> Go back
            </Button>
          </Link>
        </React.Fragment>
      ) : (
        <Button
          type="primary"
          className="start-button"
          shape="round"
          block
          loading={props.status !== "success"}
          onClick={props.startClick}
        >
          Start quiz
        </Button>
      )}
    </Card>
  );
};

export default QuizStart;
