import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { FirebaseProvider } from "./firebase/context";

import * as serviceWorker from "./serviceWorker";

import "./index.scss";
import { UserProvider } from "./auth/context";

ReactDOM.render(
  <FirebaseProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </FirebaseProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
