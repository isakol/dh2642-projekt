import React from "react";
import {Card, Col, Row} from "antd";


const QuizBreakdown = (props) => {
  return (
    <Card title="Quiz Breakdown">
      <div className="breakdown-card">
        {
          props.answers.map((q, i) => {
            return (
              <div className="breakdown" key={i}>
                <div className="breakdown-number" style={q.correct ? {borderColor: "#52c41a", color: "#52c41a"} : {borderColor: "#f5222d", color: "#f5222d"}}>{i+1}</div>
                <div className="breakdown-main">
                  <div className="breakdown-title">{q.question}</div>
                  <div>{q.answer == "" ? "You didn't answer" : "You answered: " + q.answer}</div>
                  {q.correct ? null : <div>Correct answer: {q.correct_answer}</div>}
                </div>
                {q.correct ? <div className="breakdown-points">+{q.pointsGained}</div> : null }
              </div>
            )
          })
        }
      </div>
    </Card>
  );
};

export default QuizBreakdown;
