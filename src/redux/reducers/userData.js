const initialState = {
    userData: {
        score: 0, 
        categoryPreferences: [{id: 9, times: 0, points: 0},{id: 10, times: 0, points: 0},
        {id: 11, times: 0, points: 0},{id: 12, times:0, points: 0},{id: 13, times:0, points: 0},
        {id: 14,times:0, points: 0},{id: 15, times: 0, points: 0},{id: 16, times:0, points: 0},
        {id: 17, times:0, points: 0},{id: 18, times:0, points: 0},{id: 19,times:0, points: 0},
        {id: 20,times:0, points: 0},{id: 21,times:0, points: 0},{id: 22,times:0, points: 0},
        {id: 23, times:0, points: 0},{id: 24, times:0, points: 0},{id: 25,times:0, points: 0},
        {id: 26,times:0, points: 0},{id: 27,times:0, points: 0},{id: 28,times:0, points: 0},{id: 29,times:0, points: 0},
        {id: 30,times:0, points: 0},{id: 31,times:0, points: 0},{id: 32,times:0, points: 0}],
        takenQuizzes: [],
        clearRate: 0.0
    }
  };

const userDataReducer = function(state = initialState, action) {
    switch (action.type) {
      case "UPDATE_SCORE":
            let newScore = action.score;
            return {
                ...state,
                userData: {
                  ...state.userData,
                  score: newScore
                }
            }
            break;
      case "UPDATE_CATEGORY_PREFERENCES":
            let newCatPref = action.categoryPreferences;
            return {
                ...state,
                userData: {
                  ...state.userData,
                  categoryPreferences: newCatPref
                }
            }
            break;
      case "UPDATE_TAKEN_QUIZZES":
            let newTakenQuizzes = action.takenQuizzes;
            return {
                ...state,
                userData: {
                  ...state.userData,
                  categoryPreferences: newTakenQuizzes
                }
            }
            break;
      case "UPDATE_CLEAR_RATE":
            let newClearRate = action.clearRate;
            return {
                ...state,
                userData: {
                  ...state.userData,
                  clearRate: newClearRate
                }
            }
            break;
    }
  
    return state;
  }
  
  export default userDataReducer;