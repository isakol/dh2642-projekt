import {
  SETTINGS_LOADING,
  SETTINGS_ERROR,
  SETTINGS_SUCCESS
} from "../constants";

const settingsReducer = function(state = {status: "", message: ""}, action) {
  switch (action.type) {
    case SETTINGS_SUCCESS:
      state = {status: "success", message: ""};
      break;
    case SETTINGS_ERROR:
      state = {status:"error", message: action.message};
      break;
    case SETTINGS_LOADING:
      state = {status:"loading", message:""};
    default: //do nothing
  }

  return state;
}

export default settingsReducer;
