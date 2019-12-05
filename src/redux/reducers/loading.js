import {LOADING_START,LOADING_FINISHED} from "../constants";

const loadingReducer = function(state = "", action) {
  switch (action.type) {
    case LOADING_START:
      state = "LOADING";
      break;
    case LOADING_FINISHED:
      state = ""
      break;
  }
  return state;
}

export default loadingReducer;
