const initialState = {
    quizResults: {
        category: "",
        difficulty: "",
        questions: []
    }
  };

const quizResultsReducer = function(state = initialState, action) {
    switch (action.type) {
        case "UPDATE_CATEGORY":
            let newCategory = action.category;
            return {
                ...state,
                quizResults: {
                  ...state.quizResults,
                  category: newCategory
                }
            }
            break;
        case "UPDATE_DIFFICULTY":
            let newDifficulty = action.difficulty;
            return {
                ...state,
                quizResults: {
                  ...state.quizResults,
                  difficulty: newDifficulty
                }
            }
            break;
        case "UPDATE_QUESTIONS":
            let newQuestions = action.questions;
            return {
                ...state,
                quizResults: {
                  ...state.quizResults,
                  questions: newQuestions
                }
            }
            break;
    }

    return state;
  }

  export default quizResultsReducer; 
