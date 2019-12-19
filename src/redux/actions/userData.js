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

export const updateCategoryPreferences = (categoryId, score) => async dispatch => {
  console.log(score);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.database().ref('users/'+user.uid+'/categories/'+categoryId).transaction((data) => {
        if (data == null) {
          return {
            times: 1,
            points: score
          }
        } else {
          data.points = data.points + score;
          data.times++;
          return data;
        }
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
