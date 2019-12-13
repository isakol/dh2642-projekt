import React from "react";
import Login from "./components/Login";
import { connect } from "react-redux";

const RequireAuth = (props) => {
  return !props.auth.isLoaded ? "" : !props.auth.isEmpty ? props.children : <Login />;
}


function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth
  };
}

export default connect(mapStateToProps)(RequireAuth);
