const initialState = {
      user: {
          name: "", 
          mail: "",
          picture: ""
      }
    };

const userReducer = function(state = initialState, action) {
    switch (action.type) {
      case "CHANGE_DISPLAYNAME":
            let newStateName = (state.some(user => {return user.name == action.username})) ? state : [...state, action.username];
            return newStateName;
            break;
      case "CHANGE_EMAIL":
            let newStateMail = (state.some(user => {return user.mail == action.mail})) ? state : [...state, action.mail];
            return newStateMail;
            break;
      case "CHANGE_PICTURE":
            let newStateImage = (state.some(user => {return user.image == action.image})) ? state : [...state, action.image];
            return newStateImage;
            break;
    }
  
    return state;
  }
  
  export default userReducer;
  