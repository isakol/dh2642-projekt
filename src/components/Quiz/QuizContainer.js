import React, {Component} from "react";
import QuestionsCard from "./QuestionsCard";
import "./Quiz.css";

let questions = `{"response_code":0,"results":[{"category":"Science: Mathematics","type":"boolean","difficulty":"medium","question":"The proof for the Chinese Remainder Theorem used in Number Theory was NOT developed by its first publisher, Sun Tzu.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"In Call of Duty: United Offensive, what two soldiers share a name of a video game character?","correct_answer":"Gordon &amp; Freeman","incorrect_answers":["Sam &amp; Fisher","Nathan &amp; Drake","Dig &amp; Dug"]},{"category":"Entertainment: Musicals & Theatres","type":"multiple","difficulty":"medium","question":"What was George Bizet&#039;s last opera?","correct_answer":"Carmen","incorrect_answers":["Don Rodrigue","Gris&eacute;lidis","Les p&ecirc;cheurs de perles"]},{"category":"History","type":"multiple","difficulty":"medium","question":"What is the bloodiest event in United States history, in terms of casualties?","correct_answer":"Battle of Antietam","incorrect_answers":["Pearl Harbor","September 11th","D-Day"]},{"category":"Vehicles","type":"boolean","difficulty":"medium","question":"Arriva is owned by the Deutsche Bahn.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"In the first Left 4 Dead, you can play as either of these four characters.","correct_answer":"Francis, Bill, Zoey, and Louis","incorrect_answers":["Bender, Andrew, Allison, and Brian","Coach, Ellis, Nick, and Rochelle","Harry, Ron, Hermione and Dumbledore"]},{"category":"Science & Nature","type":"multiple","difficulty":"hard","question":"What genetic disease is caused by having an extra Y chromosome (XYY)?","correct_answer":"Jacob&#039;s Syndrome","incorrect_answers":["Klinefelter&#039;s Syndrome","Turner&#039;s Syndrome","Down Syndrome"]},{"category":"Science: Gadgets","type":"multiple","difficulty":"easy","question":"When was the iPhone released?","correct_answer":"2007","incorrect_answers":["2005","2006","2004"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"medium","question":"Which album by American rapper Kanye West contained songs such as &quot;Love Lockdown&quot;, &quot;Paranoid&quot; and &quot;Heartless&quot;?","correct_answer":"808s &amp; Heartbreak","incorrect_answers":["Late Registration","The Life of Pablo","Graduation"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"hard","question":"In the indie farming game &quot;Stardew Valley&quot;, which NPC hates the &quot;prismatic shard&quot; item when received as a gift?","correct_answer":"Haley","incorrect_answers":["Abigail ","Elliott","Lewis"]}]}`
questions = JSON.parse(questions);

let question='{"category":"Science: Gadgets","type":"multiple","difficulty":"easy","question":"When was the iPhone released?","correct_answer":"2007","incorrect_answers":["2005","2006","2004"]}';

class QuizContainer extends Component {
  constructor(props) {
    super(props);
    this.total_questions = questions.results.length;
    this.state = {
      currentQuestion: 1,
      points: 0,
      timeLeft: 10000, //10 seconds
      stopped: false
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      if (!this.state.stopped) {
        let currentTimeLeft = this.state.timeLeft-100
        this.setState({timeLeft: currentTimeLeft});
        if (currentTimeLeft <= 0) {
          this.stop("");
        }
      }
    }, 100);
  }
  answerClick = (ans) => {
    this.stop(ans);
  }

  stop(answer) {
    this.setState({stopped: true});
    if (!this.state.stopped) {
      if (answer == questions.results[this.state.currentQuestion-1].correct_answer) {
        this.setState({points: this.state.points+100-(10-this.state.currentTimeLeft/1000*5)});
        alert("correct");
      } else {
        alert("incorrect");
      }
    }
  }

  render() {
    return <QuestionsCard question={questions.results[this.state.currentQuestion-1]} timeLeft={this.state.timeLeft} answerClick={this.answerClick} />
  }
}

export default QuizContainer;
