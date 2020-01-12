import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

export const updateHistory = (
  categoryId,
  difficulty,
  score,
  correct,
  answered
) => async dispatch => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      const history = firebase
        .database()
        .ref("users/" + user.uid)
        .child("history");

      const newPostKey = history.push().key;
      let historyLength = 0;

      history
        .once("value", snapshot => {
          historyLength = snapshot.numChildren();
        })
        .then(() => {
          if (historyLength >= 5) {
            history
              .orderByChild("timestamp")
              .limitToFirst(1)
              .once("child_added", snapshot => {
                snapshot.ref.remove();
              });
          }

          firebase
            .database()
            .ref("users/" + user.uid + "/history/" + newPostKey)
            .update({
              id: parseInt(categoryId),
              difficulty: difficulty,
              score: score,
              correct: correct,
              answered: answered,
              timestamp: firebase.database.ServerValue.TIMESTAMP
            });
        });
    } else {
      // No user is signed in.
    }
  });
};

export const updateScore = score => async dispatch => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase
        .database()
        .ref("users/" + user.uid + "/points")
        .transaction(currentPoints => {
          return currentPoints + score;
        });
    } else {
      // No user is signed in.
    }
  });
};

export const updateCategoryScore = (
  categoryId,
  score
  ) => async dispatch => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase
        .database()
        .ref("categories/" + categoryId + "/user" + user.uid)
        .transaction(data => {
          if (data != null) {
            data.points == null
              ? (data.points = score)
              : (data.points += score);
            data.displayName == null
              ? (data.displayName = user.auth.displayName)
              : data.displayName != user.auth.displayName ?
               (data.displayName = user.auth.displayName) :
               (data.displayName = data.displayName)
          } else {
            data = {
              points: score,
              displayName: user.auth.displayName
            };
          }
          return data;
        });
      } else {
      // No user is signed in.
    }
  });
};

export const updateCategoryPreferences = (
  categoryId,
  score,
  correct,
  answered
) => async dispatch => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase
        .database()
        .ref("users/" + user.uid + "/categories/" + categoryId)
        .transaction(data => {
          if (data != null) {
            data.points == null
              ? (data.points = score)
              : (data.points += score);
            data.times == null ? (data.times = 1) : data.times++;
            data.answered == null
              ? (data.answered = answered)
              : (data.answered += answered);
            data.correct == null
              ? (data.correct = correct)
              : (data.correct += correct);
          } else {
            data = {
              points: score,
              times: 1,
              correct: correct,
              answered: answered
            };
          }
          return data;
        });
    } else {
      // No user is signed in.
    }
  });
};
