import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";


import { Provider } from "react-redux";
import { createStore, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./redux/reducers/";

import firebase from 'firebase/app'
import 'firebase/auth'
import  'firebase/database'
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

const fbConfig = {
  apiKey: "AIzaSyDN4t9uN-FI8khph6R01-YHHleB0ae7eRE",
  authDomain: "interaktionsprogrammering.firebaseapp.com",
  databaseURL: "https://interaktionsprogrammering.firebaseio.com",
  projectId: "interaktionsprogrammering",
  storageBucket: "interaktionsprogrammering.appspot.com",
  messagingSenderId: "425699556981",
  appId: "1:425699556981:web:8416475207c40e978ac23c"
};

const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk)
);

const rrfConfig = {
  userProfile: 'users',
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}

firebase.initializeApp(fbConfig)

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
