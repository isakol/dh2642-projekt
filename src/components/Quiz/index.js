import React, {Component} from "react";
import QuestionsCard from "./QuestionsCard";
import QuizBreakdown from "./QuizBreakdown";
import "./Quiz.css";

let questions = `{"response_code":0,"results":[{"category":"Geography","type":"multiple","difficulty":"medium","question":"Montreal is in which Canadian province?","correct_answer":"Quebec","incorrect_answers":["Ontario","Nova Scotia","Alberta"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"medium","question":"What is the name of the first &quot;Star Wars&quot; film by release order?","correct_answer":"A New Hope","incorrect_answers":["The Phantom Menace","The Force Awakens","Revenge of the Sith"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"Which German city is located on the River Isar?","correct_answer":"Munich","incorrect_answers":["Berlin","Hamburg","Dortmund"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"medium","question":"Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.","correct_answer":"Hurt","incorrect_answers":["Closer","A Warm Place","Big Man with a Gun"]},{"category":"Entertainment: Television","type":"multiple","difficulty":"medium","question":"Who co-founded the YouTube Let&#039;s Play channel &quot;Game Grumps&quot; alongside Newgrounds animator Egoraptor?","correct_answer":"JonTron","incorrect_answers":["Pewdiepie","Tobuscus","Markiplier"]},{"category":"History","type":"multiple","difficulty":"medium","question":"What was the transfer of disease, crops, and people across the Atlantic shortly after the discovery of the Americas called?","correct_answer":"The Columbian Exchange","incorrect_answers":["Triangle Trade","Transatlantic Slave Trade","The Silk Road"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"medium","question":"This trope refers to minor characters that are killed off to show how a monster works.","correct_answer":"Red Shirt","incorrect_answers":["Minions","Expendables","Cannon Fodder"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"What is the busiest port in Europe?","correct_answer":"Port of Rotterdam","incorrect_answers":["Port of Antwerp","Port of Hamburg","Port of Amsterdam"]},{"category":"History","type":"multiple","difficulty":"medium","question":"Which of the following snipers has the highest amount of confirmed kills?","correct_answer":"Simo H&auml;yh&auml;","incorrect_answers":["Chris Kyle","Vasily Zaytsev","Craig Harrison"]},{"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"medium","question":"What year did &quot;Attack on Titan&quot; Season 2 begin airing?","correct_answer":"2017","incorrect_answers":["2018","2019","2020"]}]}`
questions = JSON.parse(questions);

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



class Quiz extends Component {
  constructor(props) {
    super(props);
    this.total_questions = questions.results.length;
    this.alternatives = [];
    this.answers = [];

    questions.results.map((q,i) => {
      let tempalternatives = q.incorrect_answers;
      tempalternatives.push(q.correct_answer);
      tempalternatives = shuffle(tempalternatives);
      this.alternatives[i] = tempalternatives;
    })

    this.state = {
      currentQuestion: 1,
      points: 0,
      correctOrIncorrect: null,
      timeLeft: 10000, //10 seconds
      stopped: false,
      quizFinished: false
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
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  answerClick = (ans) => {
    this.stop(ans);
  }

  stop(answer) {
    if (!this.state.stopped) {
      this.setState({stopped: true});
      if (answer == questions.results[this.state.currentQuestion-1].correct_answer) {
        let pointsGained = Math.round((100-(50-this.state.timeLeft/1000*5)));
        this.answers.push({question: questions.results[this.state.currentQuestion-1].question, answer: answer, correct:true, pointsGained:pointsGained});
        this.setState({points: this.state.points+pointsGained, correctOrIncorrect:{status: "correct", pointsGained: pointsGained}});
      } else {
        this.answers.push({question: questions.results[this.state.currentQuestion-1].question, answer: answer, correct:false, correct_answer: questions.results[this.state.currentQuestion-1].correct_answer});
        this.setState({correctOrIncorrect: {status: "incorrect", correct_answer: questions.results[this.state.currentQuestion-1].correct_answer}})
      }
      if (this.state.currentQuestion < 10) {
        setTimeout(() => {
          this.setState({
            currentQuestion: this.state.currentQuestion+1,
            timeLeft: 10000,
            stopped:false,
            correctOrIncorrect:null
          })
        }, 2000);
      } else {
        this.setState({
          stopped:true,
          quizFinished:true
        })
      }
    }
  }


  render() {
    if (!this.state.quizFinished) {
    return <QuestionsCard
              alternatives={this.alternatives[this.state.currentQuestion-1]}
              questionNumber={this.state.currentQuestion}
              questionText={questions.results[this.state.currentQuestion-1].question}
              timeLeft={this.state.timeLeft} answerClick={this.answerClick}
              correctOrIncorrect={this.state.correctOrIncorrect}
            />
    } else {
      return <QuizBreakdown answers={this.answers}/>
    }

  }
}

export default Quiz;
