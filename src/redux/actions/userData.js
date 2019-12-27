import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

export const calculatePoints = (categoryId, difficulty, answers) => async dispatch => {
  let points = 0;
  let time = 0;
  let weighting = 1;

  /*
  let user = this.store.getState().userDataReducer;
  if(results.category.id !== user.categoryPreferences[0].id){
      weighting = weighting * calculateCategoryScaling(user, results.category);
  }
  */

  if(difficulty === "medium"){
      weighting= weighting *1.25;
  } else if(difficulty === "hard"){
      weighting = weighting*1.5;
  }

  console.log(categoryId);
  console.log(difficulty);
  console.log("____________");

  answers.forEach((question) => {
      if(question.answer == question.correct_answer){
          points = points + 10;
          time = time + question.timeLeft;
          console.log(question.timeLeft);
      }
  });
  points = Math.round(((points + (time/100))*weighting));
    console.log("____________");
  /*
  this.updateUserScore(points);
  this.sortFavoriteCategories(results, points);
  */
  console.log(points);

  /*

  */
};

export const updateScore = (score) => async dispatch => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.database().ref('users/'+user.uid+'/points').transaction((currentPoints) => {
        return currentPoints + score;
      });
    } else {
      // No user is signed in.
    }
  });
}

export const updateCategoryPreferences = (categoryId, score, correct, answered) => async dispatch => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.database().ref('users/'+user.uid+'/categories/'+categoryId).transaction((data) => {
        if (data != null) {
          data.points == null ? data.points = score : data.points += score;
          data.times == null ? data.times = 1 : data.times++;
          data.answered == null ? data.answered = answered : data.answered += answered;
          data.correct == null ? data.correct = correct : data.correct += correct;
        } else {
          data = {
            points: score,
            times: 1,
            correct: correct,
            answered: answered
          }
        }
        return data;
      });
    } else {
      // No user is signed in.
    }
  });
}
