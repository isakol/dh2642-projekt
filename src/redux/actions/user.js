export const changeDisplayName = (username) => {
    dispatch({type: "CHANGE_DISPLAYNAME", action: username});
  };

  export const changeEmail = (mail) => {
    dispatch({type: "CHANGE_EMAIL", action: mail});
  };

  export const changePicture = (image) => {
    dispatch({type: "CHANGE_PICTURE", action: image});
  };