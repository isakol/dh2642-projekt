/*
import * as firebase from "firebase/app";
import "firebase/auth";
*/
import {getFirebase} from 'react-redux-firebase'
import {
  SETTINGS_LOADING,
  SETTINGS_ERROR,
  SETTINGS_SUCCESS
} from "../constants";


export const updateUserInfo = (profileObject) => async dispatch => {
  return (dispatch, getFirebase) => {
    const firebase = getFirebase();
    firebase.updateAuth(profileObject);
  }
  /*
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      user.updateProfile(profileObject).then(() => {
        dispatch({type: SETTINGS_SUCCESS});
      }).catch(() => {
        dispatch({type: SETTINGS_ERROR, message: "We could not change your information. Please try again later."})
      })
    } else {
      dispatch({type: SETTINGS_ERROR, message:"You are not logged in."});
    }
  });
  */
}
