import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
} from "../constants";

const authReducer = function(state = {message: ""}, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
    case SIGNOUT_SUCCESS:
    case SIGNUP_SUCCESS:
      state = { ...state, message: "" };
      break;
    case SIGNIN_ERROR:
    case SIGNUP_ERROR:
    case SIGNOUT_ERROR:
      state = {...state, message: action.message}
      break;
  }

  return state;
}

export default authReducer;
