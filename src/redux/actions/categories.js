import {
  CATEGORIES_LOADING,
  CATEGORIES_ERROR,
  CATEGORIES_SUCCESS
} from "../constants";

export const get_categories = () => async dispatch => {

  dispatch({type: "CATEGORIES_LOADING"});

  fetch("https://opentdb.com/api_category.php", {method:"GET"})
  .then(response => {
    if (response.ok) {
      return response.json().then(cats => {
        dispatch({type: CATEGORIES_SUCCESS, categories: cats.trivia_categories})
      });
    } else {
      dispatch({type: CATEGORIES_ERROR, message: "An unknown error occured while fetching the categories. Please try again later."});
    }
  })
  .catch(() => {
    dispatch({type: CATEGORIES_ERROR, message: "An unknown error occured while fetching the categories. Please try again later."});
  });
};
