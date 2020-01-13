import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./redux/reducers/";
import firebase from 'firebase/app'
import 'firebase/auth'
import  'firebase/database'
import { fbConfig } from "./firebase.js"
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

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
