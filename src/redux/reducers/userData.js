const initialState = {
    userData: {
        score: 0, 
        categoryPreferences: [{name:"General Knowledge", times: 0},{name:"Entertainment: Books", times: 0},{name:"Entertainment: Film", times: 0},
        {name:"Entertainment: Music", times:0},{name:"Entertainment: Musicals & Theatres", times:0},{name:"Entertainment: Television",times:0},
        {name:"Entertainment: Video Games", times: 0},{name:"Entertainment: Board Games", times:0},{name:"Science & Nature", times:0},{name:"Science: Computers", times:0},
        {name:"Science: Mathematics",times:0},{name:"Mythology",times:0},{name:"Sports",times:0},{name:"Geography",times:0},{name:"History", times:0},
        {name:"Politics", times:0},{name:"Art",times:0},{name:"Celebrities",times:0},{name:"Animals",times:0},{name:"Vehicles",times:0},{name:"Entertainment: Comics",times:0},
        {name:"Science: Gadgets",times:0},{name:"Entertainment: Japanese Anime & Manga",times:0},{name:"Entertainment: Cartoon & Animations",times:0}],
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