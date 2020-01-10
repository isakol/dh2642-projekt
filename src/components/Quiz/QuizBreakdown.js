import React from "react";
import { Card, Col, Row } from "antd";
import he from "he";

const QuizBreakdown = props => {
  let correctNo = props.answers.filter(a => a.answer == a.correct_answer)
    .length;
  let noOfQuestions = props.answers.length;
  let clearRate = (correctNo / noOfQuestions) * 100;
  return (
    <Card
      title={
        <React.Fragment>
          <div>Quiz Breakdown</div>
          <div>
            Correct answers:{" "}
            {correctNo + "/" + noOfQuestions + " (" + clearRate + "%)"}
          </div>
          <div>Points gained: {props.score}</div>
        </React.Fragment>
      }
    >
      <div className="breakdown-card">
        {props.answers.map((q, i) => {
          return (
            <div className="breakdown" key={i}>
              <div
                className="breakdown-number"
                style={
                  q.answer == q.correct_answer
                    ? { borderColor: "#52c41a", color: "#52c41a" }
                    : { borderColor: "#f5222d", color: "#f5222d" }
                }
              >
                {i + 1}
              </div>
              <div className="breakdown-main">
                <div className="breakdown-title">{he.decode(q.question)}</div>
                <div>
                  {q.answer == ""
                    ? "You didn't answer"
                    : "You answered: " + he.decode(q.answer)}
                </div>
                {q.correct_answer == q.answer ? null : (
                  <div>Correct answer: {he.decode(q.correct_answer)}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default QuizBreakdown;
