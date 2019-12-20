import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./auth";
import loadingReducer from "./loading";
import categoryReducer from "./categories";
import settingsReducer from "./user";

export default combineReducers({
  firebaseReducer,
  authReducer,
  settingsReducer,
  loadingReducer,
  categoryReducer
});
