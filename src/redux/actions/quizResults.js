import quizResultsReducer from "../reducers/quizResults";

export const updateCategory = (category) => {
    dispatch({type: "UPDATE_CATEGORY", action: category});
  };

  export const updateDifficulty = (difficulty) => {
    dispatch({type: "UPDATE_DIFFICULTY", action: difficulty});
  };

  export const updateQuestions = (questions) => {
    dispatch({type: "UPDATE_QUESTIONS", action: questions});
  };