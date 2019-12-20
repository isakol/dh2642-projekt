import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

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
  //dispatch({type: "UPDATE_RESULTS", action: score});
};

export const updateCategoryPreferences = (categoryId, score, correct, answered) => async dispatch => {
  console.log(answered);
  console.log(correct);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.database().ref('users/'+user.uid+'/categories/'+categoryId).transaction((data) => {
        data.points == null ? data.points = score : data.points += score;
        data.times == null ? data.times = 1 : data.times++;
        data.answered == null ? data.answered = answered : data.answered += answered;
        data.correct == null ? data.correct = correct : data.correct += correct;
        return data;
      });
    } else {
      // No user is signed in.
    }
  });
}

/*

  export const updateCategoryPreferences = (categoryPreferences) => {
    dispatch({type: "UPDATE_CATEGORY_PREFERENCES", action: categoryPreferences});
  };

  export const updateClearRate = (clearRate) => {
    dispatch({type: "UPDATE_CLEAR_RATE", action: clearRate});
  };
  */
