import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./auth"
import loadingReducer from "./loading"

export default combineReducers({
  firebaseReducer,
  authReducer,
  loadingReducer
});
