import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./auth";
import loadingReducer from "./loading";
import categoryReducer from "./categories";

export default combineReducers({
  firebaseReducer,
  authReducer,
  loadingReducer,
  categoryReducer
});
