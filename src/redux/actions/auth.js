import * as firebase from "firebase/app";
import "firebase/auth";
import {startLoading, finishLoading} from "./loading";

import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR
} from "../constants";

export const signup = (email, password) => async dispatch => {
  dispatch(startLoading());

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.ref("users/" + user.uid).update({email: email, points: 0});
        dispatch({type: SIGNUP_SUCCESS});
      } else {
        dispatch({type: SIGNIN_ERROR, message:"Your account has been created but we could not sign you in. Please try doing so manually"});
      }
    });
  })
  .catch((err) => {
    dispatch({type: SIGNUP_ERROR, message:err.message});
  })
  .finally(() => {
    dispatch(finishLoading())
  });
};

export const signin = (email, password) => async dispatch => {
  dispatch(startLoading());

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    dispatch({ type: SIGNIN_SUCCESS });
  })
  .catch((err) => {
    dispatch({type: SIGNIN_ERROR, message: err.message});
  })
  .finally(() => {
    dispatch(finishLoading())
  });
};

export const signout = (history) => async dispatch => {
  dispatch(startLoading());
  firebase.auth().signOut()
  .then(() => {
    dispatch({ type: SIGNOUT_SUCCESS });
    history.push("/");
  })
  .catch((err) => {
    dispatch({type: SIGNOUT_ERROR, message: err.message});
  })
  .finally(() => {
    dispatch(finishLoading())
  });
};
