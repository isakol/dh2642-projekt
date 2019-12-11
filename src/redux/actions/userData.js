export const updateScore = (score) => {
    dispatch({type: "UPDATE_RESULTS", action: score});
  };

  export const updateCategoryPreferences = (categoryPreferences) => {
    dispatch({type: "UPDATE_CATEGORY_PREFERENCES", action: categoryPreferences});
  };

  export const updateClearRate = (clearRate) => {
    dispatch({type: "UPDATE_CLEAR_RATE", action: clearRate});
  };