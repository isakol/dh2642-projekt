import {
  CATEGORIES_ERROR,
  CATEGORIES_SUCCESS,
  CATEGORIES_LOADING
} from "../constants";


const categoryReducer = function(state = {categories:[], status:"loading", message:""}, action) {
  switch (action.type) {
    case CATEGORIES_ERROR:
      state = {...state, status:"error", message: action.message};
      break;
    case CATEGORIES_SUCCESS:
      state = {categories: action.categories, status:"success", message: ""};
      break;
    case CATEGORIES_LOADING:
      state = {...state, status:"loading", message: ""};
    break;

    default: //do nothing
  }

  return state;
}

export default categoryReducer;
