import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import categoryReducer from "./categories";

export default combineReducers({
  firebaseReducer,
  categoryReducer
});
